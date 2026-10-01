import React, { useState } from 'react';
import { Database, Cloud, Save, Check, Copy, Shield, Key } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const BackendSettings = () => {
  const [config, setConfig] = useState(storageAdapter.getBackendConfig());
  const [saved, setSaved] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const SUPABASE_SQL_SCHEMA = `CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    thumbnail_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT '{}',
    video_preview_url TEXT,
    download_file_url TEXT,
    file_size TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) DEFAULT 0.00,
    checkout_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    download_count INTEGER DEFAULT 0
);`;

  const handleSave = (e) => {
    e.preventDefault();
    storageAdapter.saveBackendConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="font-display font-bold text-lg text-white">Backend Infrastructure & Cloud Connectors</h3>
        <p className="text-xs text-gray-400 font-mono">
          Switch seamlessly between Instant LocalDB, Supabase, and Firebase
        </p>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setConfig({ ...config, activeProvider: 'local' })}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            config.activeProvider === 'local'
              ? 'glass-panel border-cyan-neon bg-cyan-neon/10 shadow-neon-cyan/20'
              : 'glass-panel border-white/10 hover:border-white/20'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-neon/20 text-cyan-neon flex items-center justify-center mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-sm text-white mb-1">Instant LocalDB</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Zero-maintenance browser engine. Works 100% instantly with pre-seeded projects and zero cloud keys.
          </p>
        </div>

        <div
          onClick={() => setConfig({ ...config, activeProvider: 'supabase' })}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            config.activeProvider === 'supabase'
              ? 'glass-panel border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
              : 'glass-panel border-white/10 hover:border-white/20'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
            <Cloud className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-sm text-white mb-1">Supabase Cloud</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            PostgreSQL Database, Auth, and Storage Buckets for public media & downloadable ZIP archives.
          </p>
        </div>

        <div
          onClick={() => setConfig({ ...config, activeProvider: 'firebase' })}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            config.activeProvider === 'firebase'
              ? 'glass-panel border-amber-400 bg-amber-500/10 shadow-neon-gold'
              : 'glass-panel border-white/10 hover:border-white/20'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-sm text-white mb-1">Firebase Cloud</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Firestore Database, Firebase Auth, and Cloud Storage distribution for asset delivery.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Supabase fields */}
        {config.activeProvider === 'supabase' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="font-semibold text-sm text-emerald-400 uppercase font-mono tracking-wider">
              Supabase Project Connection
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-gray-400">SUPABASE PROJECT URL</label>
                <input
                  type="text"
                  value={config.supabaseUrl || ''}
                  onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                  placeholder="https://xyzproject.supabase.co"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400">SUPABASE PUBLIC ANON KEY</label>
                <input
                  type="password"
                  value={config.supabaseAnonKey || ''}
                  onChange={(e) => setConfig({ ...config, supabaseAnonKey: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-emerald-400 font-mono text-xs"
                />
              </div>
            </div>

            {/* SQL Copy Box */}
            <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Database Table Schema (Run in Supabase SQL Editor):</span>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="text-emerald-400 hover:underline flex items-center gap-1"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-gray-300 font-mono overflow-x-auto p-2 bg-black/40 rounded-lg">
                {SUPABASE_SQL_SCHEMA}
              </pre>
            </div>
          </div>
        )}

        {/* Firebase fields */}
        {config.activeProvider === 'firebase' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h4 className="font-semibold text-sm text-amber-400 uppercase font-mono tracking-wider">
              Firebase Project Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-gray-400">FIREBASE API KEY</label>
                <input
                  type="password"
                  value={config.firebaseApiKey || ''}
                  onChange={(e) => setConfig({ ...config, firebaseApiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-400">FIREBASE PROJECT ID</label>
                <input
                  type="text"
                  value={config.firebaseProjectId || ''}
                  onChange={(e) => setConfig({ ...config, firebaseProjectId: e.target.value })}
                  placeholder="novavault-prod"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Gemini AI API Key */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-neon" />
            <h4 className="font-semibold text-sm text-white">Google Gemini API Key</h4>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            Powers live LLM generations in the AI Concierge widget. Leave blank to use the smart built-in assistant engine.
          </p>
          <input
            type="password"
            value={config.geminiApiKey || ''}
            onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })}
            placeholder="AIzaSyB..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon font-mono text-xs"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">
            Active Provider: <strong className="text-white capitalize">{config.activeProvider}</strong>
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-neon hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-neon-cyan transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Configuration Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Provider Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
