'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import Calendar from './Calendar';
import { motion } from 'framer-motion';

interface DatePrice {
  date: Date;
  price: number;
}

interface PriceRule {
  id: string;
  description: string;
  price: number;
  condition: string;
}

interface OccupiedDate {
  id: number;
  startDate: string;
  endDate: string;
}

interface AdminCalendarProps {
  // Props maintained for compatibility with existing code but can be safely removed later
  initialDatePrices?: DatePrice[];
  onSaveDates?: (newDatePrices: DatePrice[]) => Promise<void>;
}

export default function AdminCalendar({}: AdminCalendarProps) {
  const [priceRules, setPriceRules] = useState<PriceRule[]>([
    {
      id: '1',
      description: 'Weekend',
      price: 3300,
      condition: 'per weekend'
    },
    {
      id: '2',
      description: 'Zile Lucrătoare',
      price: 1300,
      condition: 'pe noapte (minim 2 nopți)'
    },
    {
      id: '3',
      description: 'O Singură Noapte',
      price: 1700,
      condition: 'pe noapte (doar o singură noapte)'
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [occupiedDates, setOccupiedDates] = useState<OccupiedDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);

  useEffect(() => {
    fetchOccupiedDates();
  }, []);

  const fetchOccupiedDates = async () => {
    try {
      const response = await fetch('/api/occupied-dates');
      if (response.ok) {
        const data = await response.json();
        setOccupiedDates(data);
      }
    } catch (error) {
      console.error('Error fetching occupied dates:', error);
      setError('Eroare la încărcarea datelor ocupate. Vă rugăm să încercați din nou.');
    }
  };

  const handleEdit = (rule: PriceRule) => {
    setIsEditing(rule.id);
    setEditPrice(rule.price);
  };

  const handleSave = async (id: string) => {
    try {
      const response = await fetch('/api/price-rules', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, price: editPrice }),
      });

      if (response.ok) {
        setPriceRules(prev =>
          prev.map(rule =>
            rule.id === id ? { ...rule, price: editPrice } : rule
          )
        );
        setIsEditing(null);
      }
    } catch (error) {
      console.error('Error updating price rule:', error);
      setError('Eroare la salvarea prețului. Vă rugăm să încercați din nou.');
    }
  };

  // We need to accept totalPrice parameter to match the Calendar component's API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateSelect = (startDate: Date | null, endDate: Date | null, totalPrice: number) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const handleMarkAsOccupied = async () => {
    if (selectedStartDate && selectedEndDate) {
      setIsLoading(true);
      setError(null);

      // Create a temporary ID for optimistic update
      const tempId = Date.now();
      const newOccupiedDate: OccupiedDate = {
        id: tempId,
        startDate: selectedStartDate.toISOString(),
        endDate: selectedEndDate.toISOString(),
      };

      // Optimistically update the UI
      setOccupiedDates(prev => [...prev, newOccupiedDate]);
      setSelectedStartDate(null);
      setSelectedEndDate(null);

      try {
        const response = await fetch('/api/occupied-dates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startDate: selectedStartDate,
            endDate: selectedEndDate,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to mark dates as occupied');
        }

        const savedOccupiedDate = await response.json();
        
        // Update the temporary ID with the real one from the server
        setOccupiedDates(prev => 
          prev.map(date => 
            date.id === tempId ? savedOccupiedDate : date
          )
        );

        // Force a re-render of the calendar by updating the key
        setCalendarKey(prev => prev + 1);
      } catch (error) {
        console.error('Error marking dates as occupied:', error);
        // Revert the optimistic update on error
        setOccupiedDates(prev => prev.filter(date => date.id !== tempId));
        setError('Eroare la marcarea perioadei ca ocupată. Vă rugăm să încercați din nou.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveOccupied = async (id: number) => {
    setIsLoading(true);
    setError(null);

    // Optimistically remove the date
    setOccupiedDates(prev => prev.filter(date => date.id !== id));
    
    // Force a re-render of the calendar
    setCalendarKey(prev => prev + 1);

    try {
      const response = await fetch('/api/occupied-dates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove occupied date');
      }
    } catch (error) {
      console.error('Error removing occupied date:', error);
      // Revert the optimistic update on error
      await fetchOccupiedDates();
      setError('Eroare la ștergerea perioadei ocupate. Vă rugăm să încercați din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-4 sm:py-8 bg-black">
      <div className="w-full px-0 sm:px-6">
        <div className="bg-black rounded-lg border border-[#2A2A2A] p-4 sm:p-6 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mb-6 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">Gestionare Prețuri Cabane</h2>
          
          {error && (
            <motion.div 
              className="bg-red-100/10 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-lg mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            {priceRules.map((rule) => (
              <motion.div 
                key={rule.id} 
                className="bg-black p-4 rounded-lg border border-[#2A2A2A] hover:border-[#2f6310]/40 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-amber-100">{rule.description}</h3>
                    <p className="text-sm text-amber-50/60">{rule.condition}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {isEditing === rule.id ? (
                      <>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-32 px-3 py-2 bg-black border border-[#2A2A2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f6310] text-amber-100"
                          min="0"
                        />
                        <button
                          onClick={() => handleSave(rule.id)}
                          className="bg-[#2f6310] hover:bg-[#3d7f15] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2f6310]/20"
                          disabled={isLoading}
                        >
                          Salvează
                        </button>
                        <button
                          onClick={() => setIsEditing(null)}
                          className="text-amber-50/60 hover:text-amber-50/90"
                          disabled={isLoading}
                        >
                          Anulează
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold text-amber-100">{rule.price} RON</span>
                        <button
                          onClick={() => handleEdit(rule)}
                          className="text-[#2f6310] hover:text-[#3d7f15] transition-colors"
                          disabled={isLoading}
                        >
                          Editează
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-amber-100 mb-4">Calendar și Perioade Ocupate</h3>
            
            <Calendar 
              key={calendarKey}
              onDateSelect={handleDateSelect}
              isAdmin={true}
              priceRules={priceRules}
            />

            {selectedStartDate && selectedEndDate && (
              <motion.div 
                className="mt-4 p-4 bg-black rounded-lg border border-[#2A2A2A] hover:border-[#2f6310]/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-amber-50/90">
                      Perioada selectată: {format(selectedStartDate, 'd MMMM yyyy')} - {format(selectedEndDate, 'd MMMM yyyy')}
                    </p>
                  </div>
                  <button
                    onClick={handleMarkAsOccupied}
                    className="bg-[#8B0000] hover:bg-[#A00000] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#8B0000]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Se procesează...' : 'Marchează ca Ocupat'}
                  </button>
                </div>
              </motion.div>
            )}

            <div className="mt-4">
              <h4 className="text-md font-semibold text-amber-100 mb-2">Perioade Ocupate</h4>
              <div className="space-y-2">
                {occupiedDates.map((occupied) => (
                  <motion.div 
                    key={occupied.id} 
                    className="flex justify-between items-center bg-black p-3 rounded-lg border border-[#2A2A2A] hover:border-[#2f6310]/40 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-amber-50/90">
                      {format(new Date(occupied.startDate), 'd MMMM yyyy', { locale: ro })} - {format(new Date(occupied.endDate), 'd MMMM yyyy', { locale: ro })}
                    </span>
                    <button
                      onClick={() => handleRemoveOccupied(occupied.id)}
                      className="text-[#2f6310] hover:text-[#3d7f15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      Șterge
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 