import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Sparkles, Key } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('admin@novavault.io');
  const [password, setPassword] = useState('novavault2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      // Valid credentials or custom user login
      if (email.trim() && password.length >= 6) {
        storageAdapter.setAdminAuth(true);
        onLoginSuccess();
      } else {
        setError('Invalid access credentials. Please enter a valid email and password (min 6 characters).');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-neon/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-violet-neon/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-neon/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-cyan-neon/15 border border-cyan-neon/30 text-cyan-neon flex items-center justify-center mx-auto mb-4 shadow-neon-cyan/20">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-white">NovaVault Back-Office</h2>
          <p className="text-xs text-gray-400 font-mono mt-1">Secured Admin Gate • System Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Admin Identity / Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@novavault.io"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              Master Access Passkey
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all"
            />
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 font-mono flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-neon flex-shrink-0 mt-0.5" />
            <span>
              Default demo credentials prefilled. You can also connect Supabase Auth or Firebase in settings.
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-neon to-[#0284C7] hover:from-cyan-400 hover:to-[#0284C7] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-neon-cyan transition-all hover:scale-[1.01]"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onBackToSite}
            className="text-xs text-gray-400 hover:text-white font-mono transition-colors"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
