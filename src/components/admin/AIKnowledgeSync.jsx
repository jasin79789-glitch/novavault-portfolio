import React, { useState } from 'react';
import { Bot, Save, Check, RefreshCw } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const AIKnowledgeSync = () => {
  const [knowledge, setKnowledge] = useState(storageAdapter.getAIKnowledge());
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    storageAdapter.saveAIKnowledge(knowledge);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-white">AI Portfolio Concierge Knowledge Sync</h3>
          <p className="text-xs text-gray-400 font-mono">
            Tune system instructions, creator identity, and response boundaries
          </p>
        </div>

        <div className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-neon/15 border border-cyan-neon/30 text-cyan-neon flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5" />
          <span>Active Context Engine</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-400 uppercase">Creator Full Name</label>
            <input
              type="text"
              value={knowledge.creatorName}
              onChange={(e) => setKnowledge({ ...knowledge, creatorName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-400 uppercase">Professional Title</label>
            <input
              type="text"
              value={knowledge.title}
              onChange={(e) => setKnowledge({ ...knowledge, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-gray-400 uppercase">Core Focus Areas & Specializations</label>
          <input
            type="text"
            value={knowledge.focus}
            onChange={(e) => setKnowledge({ ...knowledge, focus: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-gray-400 uppercase">Conversational Tone & Persona</label>
          <input
            type="text"
            value={knowledge.tone}
            onChange={(e) => setKnowledge({ ...knowledge, tone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-gray-400 uppercase">
            Custom Directives & Business Rules (System Prompt Bounding)
          </label>
          <textarea
            rows={5}
            value={knowledge.customNotes}
            onChange={(e) => setKnowledge({ ...knowledge, customNotes: e.target.value })}
            placeholder="Add specific instructions for the concierge (e.g. download rules, pricing explanation, contact routing)..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon resize-none font-mono text-xs leading-relaxed"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-mono">
            Synchronizes instantly with live AI widget
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-neon hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-neon-cyan transition-all"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Knowledge Synchronized!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update AI Knowledge</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
