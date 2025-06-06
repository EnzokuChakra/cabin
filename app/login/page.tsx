'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to admin page on success
      router.push('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-8">
          <h1 className="text-2xl font-serif font-bold text-amber-100 mb-6 text-center">
            Admin Login
          </h1>

          {error && (
            <div className="bg-red-100/10 backdrop-blur-sm border border-red-400/30 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-amber-50/60 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-amber-50 focus:outline-none focus:border-[#2f6310]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-amber-50/60 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg text-amber-50 focus:outline-none focus:border-[#2f6310]"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2f6310] hover:bg-[#3d7f15] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#2f6310]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Se încarcă...' : 'Login'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 