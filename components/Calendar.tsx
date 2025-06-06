'use client';

import { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, differenceInDays, isSunday, isSaturday, isToday } from 'date-fns';
import { ro } from 'date-fns/locale';
import { motion } from 'framer-motion';
import Alert from './Alert';

const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface DatePrice {
  date: Date;
  price: number;
}

interface OccupiedDate {
  id: number;
  startDate: string;
  endDate: string;
}

interface CalendarProps {
  datePrices?: DatePrice[];
  onDateSelect?: (startDate: Date | null, endDate: Date | null, totalPrice: number) => void;
  isAdmin?: boolean;
  priceRules?: {
    id: string;
    description: string;
    price: number;
    condition: string;
  }[];
}

export default function Calendar({ onDateSelect, isAdmin = false, priceRules = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [occupiedDates, setOccupiedDates] = useState<OccupiedDate[]>([]);
  const [alert, setAlert] = useState<{ show: boolean; message: string; type: 'error' | 'success' | 'warning' }>({
    show: false,
    message: '',
    type: 'error'
  });

  useEffect(() => {
    fetchOccupiedDates();
  }, []);

  const fetchOccupiedDates = async () => {
    try {
      const response = await fetch('/api/occupied-dates');
      const data = await response.json();
      setOccupiedDates(data);
    } catch (error) {
      console.error('Error fetching occupied dates:', error);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const calculatePrice = (start: Date, end: Date): number => {
    const days = differenceInDays(end, start) + 1;
    
    // Check if the selection is a weekend (Saturday and Sunday)
    const isWeekendSelection = isSaturday(start) && isSunday(end) && days === 2;

    // Check if the selection is a single night
    const isSingleNight = days === 1;

    // Find the appropriate price rule
    if (isWeekendSelection) {
      const weekendRule = priceRules.find(rule => rule.description === 'Weekend');
      return weekendRule?.price || 3300; // Fallback to default if rule not found
    } else if (isSingleNight) {
      const singleNightRule = priceRules.find(rule => rule.description === 'O Singură Noapte');
      return singleNightRule?.price || 1700; // Fallback to default if rule not found
    } else {
      // For multiple weekdays (minimum 2 nights)
      const weekdayRule = priceRules.find(rule => rule.description === 'Zile Lucrătoare');
      return days * (weekdayRule?.price || 1300); // Fallback to default if rule not found
    }
  };

  const isRangeOccupied = (start: Date, end: Date) => {
    return occupiedDates.some(occupied => {
      const occupiedStart = new Date(occupied.startDate);
      const occupiedEnd = new Date(occupied.endDate);
      // Check if the selected range overlaps with any occupied period
      return (
        (start <= occupiedEnd && end >= occupiedStart) || // Range overlaps with occupied period
        (start >= occupiedStart && end <= occupiedEnd)    // Range is within occupied period
      );
    });
  };

  const showAlert = (message: string, type: 'error' | 'success' | 'warning' = 'error') => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, show: false }));
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(null);
      if (onDateSelect) onDateSelect(date, null, 0);
    } else {
      // Complete the selection
      let newStartDate = startDate;
      let newEndDate = date;

      // Ensure start date is before end date
      if (date < startDate) {
        newStartDate = date;
        newEndDate = startDate;
      }

      // Check if the selected range includes any occupied dates
      if (isRangeOccupied(newStartDate, newEndDate)) {
        // If range includes occupied dates, don't allow the selection
        showAlert('Nu puteți selecta o perioadă care include zile ocupate.', 'error');
        setStartDate(null);
        setEndDate(null);
        if (onDateSelect) onDateSelect(null, null, 0);
        return;
      }

      // If range is valid, complete the selection
      setStartDate(newStartDate);
      setEndDate(newEndDate);
      if (onDateSelect) {
        const totalPrice = calculatePrice(newStartDate, newEndDate);
        onDateSelect(newStartDate, newEndDate, totalPrice);
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!startDate) return false;
    if (!endDate) return isSameDay(date, startDate);
    return isSameDay(date, startDate) || isSameDay(date, endDate);
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateOccupied = (date: Date) => {
    return occupiedDates.some(occupied => 
      date >= new Date(occupied.startDate) && date <= new Date(occupied.endDate)
    );
  };

  // Removed unused getOccupiedPeriod function

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-amber-100 hover:text-amber-200 transition-colors">
          &lt;
        </button>
        <h2 className="text-lg font-serif font-bold text-amber-100 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
          {format(currentMonth, 'MMMM yyyy', { locale: ro })}
        </h2>
        <button onClick={nextMonth} className="text-amber-100 hover:text-amber-200 transition-colors">
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-medium text-amber-50/60">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isSelected = isDateSelected(cloneDay);
        const isInRange = isDateInRange(cloneDay);
        const isOccupied = isDateOccupied(cloneDay);
        const isCurrentDay = isToday(cloneDay);

        days.push(
          <div
            className={`p-2 text-center rounded-lg transition-all cursor-pointer relative group ${
              !isSameMonth(day, monthStart)
                ? 'text-amber-50/30'
                : isOccupied
                ? 'bg-[#8B0000]/20 text-[#FF6B6B] cursor-not-allowed border-2 border-[#8B0000]/30'
                : isSelected
                ? 'bg-amber-200/20 text-white'
                : isInRange
                ? 'bg-amber-200/10 text-white'
                : 'text-amber-50/90 hover:bg-amber-200/10'
            } ${isCurrentDay ? 'border border-white/50' : ''}`}
            key={day.toString()}
            onClick={() => !isOccupied && handleDateClick(cloneDay)}
          >
            <span className="inline-block w-full font-medium">{formattedDate}</span>
            {isOccupied && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#8B0000]/90 backdrop-blur-sm text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg pointer-events-none">
                Ocupat
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 mb-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <section id="calendar" className="relative py-20 bg-black overflow-hidden">
      {/* Nature-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
        {/* Subtle green decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#2f6310]/5 blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-[#3d7f15]/5 blur-2xl"></div>
      </div>

      {/* Layered Backgrounds */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Wood-textured gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 mix-blend-color-burn" />
        {/* Subtle wood grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4KICA8ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIuNzUiIG51bU9jdGF2ZXM9IjQiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIC8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiAvPgo8L3N2Zz4=')] opacity-30 mix-blend-overlay" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        {!isAdmin && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative wood grain divider above title */}
            <div className="w-24 h-2 mb-6 relative mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5A2B] to-transparent opacity-60 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent opacity-40 rounded-full"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-100 mb-6 [text-shadow:_0_4px_24px_rgba(0,0,0,0.9)]">
              Rezervă Acum
            </h2>
            <p className="text-amber-50/90 max-w-2xl mx-auto [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
              Alegeți perioada dorită pentru șederea dumneavoastră
            </p>
          </motion.div>
        )}

        <Alert
          show={alert.show}
          message={alert.message}
          type={alert.type}
          onClose={hideAlert}
        />

        <motion.div 
          className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg border border-[#2A2A2A] p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </motion.div>

        {!isAdmin && (
          <motion.div 
            className="mt-6 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-lg border border-[#2A2A2A] p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-bold text-amber-100 mb-4 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">Detalii Rezervare</h3>
            <div className="space-y-2">
              {!startDate && !endDate && (
                <p className="text-amber-50/60 text-center italic py-4">
                  Selecteaza datele dorite pentru a afla pretul
                </p>
              )}
              {startDate && !endDate && (
                <p className="text-amber-50/90">
                  Data de început: {startDate ? format(startDate, 'd MMMM yyyy', { locale: ro }) : ''}
                </p>
              )}
              {startDate && endDate && (
                <>
                  <p className="text-amber-50/90">
                    Perioada selectată: {format(startDate, 'd MMMM yyyy', { locale: ro })} - {format(endDate, 'd MMMM yyyy', { locale: ro })}
                  </p>
                  <p className="text-2xl font-bold text-[#2f6310]">
                    Preț total: {calculatePrice(startDate, endDate)} RON
                  </p>
                  <motion.button
                    onClick={() => {
                      const message = `Bună! Aș dori să fac o rezervare pentru perioada ${format(startDate, 'd MMMM yyyy', { locale: ro })} - ${format(endDate, 'd MMMM yyyy', { locale: ro })}.`;
                      const encodedMessage = encodeURIComponent(message);
                      window.open(`https://wa.me/40733456185?text=${encodedMessage}`, '_blank');
                    }}
                    className="w-full mt-4 bg-[#2f6310] hover:bg-[#3d7f15] text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    Rezervă pe WhatsApp
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
