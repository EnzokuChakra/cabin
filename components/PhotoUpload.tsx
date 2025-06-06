'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

interface Category {
  id: number;
  name: string;
  season: string;
}

interface PhotoUploadProps {
  categories: Category[];
  onUploadComplete: () => void;
}

interface UploadStatus {
  fileName: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function PhotoUpload({ categories, onUploadComplete }: PhotoUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeason, setSelectedSeason] = useState<'Vara' | 'Iarna'>('Vara');
  const [alt, setAlt] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatuses, setUploadStatuses] = useState<UploadStatus[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
      setAlt(files[0]?.name.split('.')[0] || '');
      setUploadStatuses([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles.length || !selectedCategory) {
      setError('Vă rugăm să selectați cel puțin o fotografie și o categorie');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadStatuses(selectedFiles.map(file => ({
      fileName: file.name,
      status: 'uploading'
    })));

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('categoryId', selectedCategory);
        formData.append('alt', alt || file.name.split('.')[0]);
        formData.append('season', selectedSeason);

        try {
          const response = await fetch('/api/photos', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload photo: ' + file.name);
          }

          setUploadStatuses(prev => prev.map((status, index) => 
            index === i ? { ...status, status: 'success' } : status
          ));
        } catch (err: Error | unknown) {
          const error = err instanceof Error ? err : new Error('Unknown error');
          setUploadStatuses(prev => prev.map((status, index) => 
            index === i ? { ...status, status: 'error', error: error.message } : status
          ));
        }
      }

      // Reset form after all uploads
      setTimeout(() => {
        setSelectedFiles([]);
        setSelectedCategory('');
        setAlt('');
        setUploadStatuses([]);
        onUploadComplete();
      }, 2000);
    } catch {
      setError('Eroare la încărcarea fotografiilor. Vă rugăm să încercați din nou.');
    } finally {
      setIsUploading(false);
    }
  };

  const filteredCategories = categories.filter(cat => cat.season === selectedSeason);

  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-6">
      <h3 className="text-xl font-serif font-bold text-amber-100 mb-4">
        Încarcă Fotografii
      </h3>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100/10 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-lg mb-4"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-amber-50/60 mb-2">
            Sezon
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setSelectedSeason('Vara')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedSeason === 'Vara'
                  ? 'bg-[#2f6310] text-white'
                  : 'bg-[#2A2A2A] text-amber-50/60 hover:text-amber-50/90'
              }`}
            >
              Vara
            </button>
            <button
              type="button"
              onClick={() => setSelectedSeason('Iarna')}
              className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedSeason === 'Iarna'
                  ? 'bg-[#2f6310] text-white'
                  : 'bg-[#2A2A2A] text-amber-50/60 hover:text-amber-50/90'
              }`}
            >
              Iarna
            </button>
          </div>
        </div>

        <div>
          <label className="block text-amber-50/60 mb-2">
            Selectează Categorie
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-amber-50/90 focus:outline-none focus:border-[#2f6310]"
            required
          >
            <option value="">Selectează o categorie</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-amber-50/60 mb-2">
            Selectează Fotografii
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-amber-50/90 focus:outline-none focus:border-[#2f6310]"
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2 text-amber-50/80 text-sm">
              {selectedFiles.length} fotografii selectate
            </div>
          )}
        </div>

        <div>
          <label className="block text-amber-50/60 mb-2">
            Descriere (opțional)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-2 text-amber-50/90 focus:outline-none focus:border-[#2f6310]"
            placeholder="Adaugă o descriere pentru fotografie"
          />
        </div>

        <AnimatePresence>
          {uploadStatuses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-2"
            >
              {uploadStatuses.map((status, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    status.status === 'success'
                      ? 'bg-green-100/10 border border-green-400/30 text-green-200'
                      : status.status === 'error'
                      ? 'bg-red-100/10 border border-red-400/30 text-red-200'
                      : 'bg-amber-100/10 border border-amber-400/30 text-amber-200'
                  }`}
                >
                  {status.status === 'uploading' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-amber-200 border-t-transparent" />
                  )}
                  {status.status === 'success' && <FiCheck className="w-4 h-4" />}
                  {status.status === 'error' && <FiAlertCircle className="w-4 h-4" />}
                  <span className="text-sm">{status.fileName}</span>
                  {status.error && (
                    <span className="text-xs opacity-75">({status.error})</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full bg-[#2f6310] hover:bg-[#3d7f15] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2f6310]/20 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? 'Se încarcă...' : 'Încarcă Fotografiile'}
        </button>
      </form>
    </div>
  );
} 