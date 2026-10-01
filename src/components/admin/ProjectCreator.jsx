import React, { useState } from 'react';
import { ArrowLeft, Save, Check, Sparkles, Plus, Trash2, Eye } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const ProjectCreator = ({ editingProject, onBack, onSaved }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    editingProject || {
      title: '',
      slug: '',
      tagline: '',
      description: '',
      category: 'Applications',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      gallery_urls: [],
      video_preview_url: '',
      download_file_url: 'project-asset-bundle.zip',
      file_size: '15.0 MB',
      is_paid: false,
      price: 0.00,
      checkout_url: '',
      featured: false,
      live_demo_url: '',
      features: [
        'Production-ready modular architecture',
        'Includes source code and asset bundle',
        'Optimized for high-performance delivery'
      ]
    }
  );

  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const autoSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug ? prev.slug : autoSlug(title),
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in the project title and description.');
      return;
    }

    storageAdapter.saveProject(formData);
    onSaved();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project List</span>
        </button>

        <h2 className="font-display font-bold text-lg text-white">
          {editingProject ? 'Edit Project' : 'New Project Wizard'}
        </h2>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
        {['1. Details', '2. Media', '3. Monetization', '4. Review'].map((label, idx) => {
          const stepNum = idx + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;
          return (
            <button
              key={idx}
              onClick={() => setStep(stepNum)}
              className={`p-2.5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-cyan-neon/15 border-cyan-neon text-cyan-neon font-semibold shadow-neon-cyan/20'
                  : isDone
                  ? 'bg-white/5 border-emerald-500/40 text-emerald-400'
                  : 'bg-white/5 border-white/5 text-gray-500'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-display font-semibold text-base text-white border-b border-white/10 pb-2">
              Basic Asset Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. AetherOS Cybernetic System"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="aetheros-cybernetic-system"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121217] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                >
                  <option value="Applications">Applications</option>
                  <option value="Games">Games</option>
                  <option value="Templates">Templates</option>
                  <option value="Design Assets">Design Assets</option>
                  <option value="Audio / Tools">Audio / Tools</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">Short Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Real-Time Spatial Operating System Concept"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase">Comprehensive Description *</label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Full markdown-ready description of architecture, setup instructions, and design notes..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon resize-none"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase">Tech Stack & Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag and press Enter..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-neon"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs hover:bg-white/20"
                >
                  Add Tag
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {formData.tags.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Media & Files */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-display font-semibold text-base text-white border-b border-white/10 pb-2">
              Media & Storage Assets
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase">Thumbnail Image URL *</label>
              <input
                type="text"
                required
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase">Looping Silent MP4 Preview (Optional)</label>
              <input
                type="text"
                value={formData.video_preview_url}
                onChange={(e) => setFormData({ ...formData, video_preview_url: e.target.value })}
                placeholder="https://assets.mixkit.co/.../video.mp4"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">Asset File URL / Bundle Name</label>
                <input
                  type="text"
                  value={formData.download_file_url}
                  onChange={(e) => setFormData({ ...formData, download_file_url: e.target.value })}
                  placeholder="aetheros-source-v1.zip"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase">File Size Indicator</label>
                <input
                  type="text"
                  value={formData.file_size}
                  onChange={(e) => setFormData({ ...formData, file_size: e.target.value })}
                  placeholder="e.g. 18.4 MB"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-400 uppercase">Live Demo Link (Optional)</label>
              <input
                type="text"
                value={formData.live_demo_url}
                onChange={(e) => setFormData({ ...formData, live_demo_url: e.target.value })}
                placeholder="https://my-demo-app.vercel.app"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon"
              />
            </div>
          </div>
        )}

        {/* Step 3: Monetization & Features */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-display font-semibold text-base text-white border-b border-white/10 pb-2">
              Monetization & Key Highlights
            </h3>

            {/* Paid Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <h4 className="font-semibold text-sm text-white">Monetization Status</h4>
                <p className="text-xs text-gray-400 font-mono">
                  {formData.is_paid
                    ? 'Premium asset (Requires hosted checkout redirect)'
                    : 'Free download (Triggers instant browser direct download)'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, is_paid: !formData.is_paid })}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  formData.is_paid ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-black transition-transform ${
                    formData.is_paid ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {formData.is_paid && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-amber-400 uppercase">Price ($ USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-amber-400 uppercase">Checkout URL (Stripe / Lemon Squeezy)</label>
                  <input
                    type="text"
                    value={formData.checkout_url}
                    onChange={(e) => setFormData({ ...formData, checkout_url: e.target.value })}
                    placeholder="https://buy.stripe.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-amber-500/30 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase">Key Architecture Features</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                  placeholder="Add a key highlight and press Enter..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-neon"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs hover:bg-white/20"
                >
                  Add
                </button>
              </div>

              <div className="space-y-1.5 pt-1">
                {(formData.features || []).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300"
                  >
                    <span>• {feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Publish */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-display font-semibold text-base text-white border-b border-white/10 pb-2">
              Asset Final Verification
            </h3>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-4">
                <img
                  src={formData.thumbnail_url}
                  alt={formData.title}
                  className="w-16 h-16 rounded-xl object-cover bg-black"
                />
                <div>
                  <h4 className="font-bold text-white text-base">{formData.title || 'Untitled Project'}</h4>
                  <p className="text-xs text-cyan-neon font-mono">{formData.category} • {formData.file_size}</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 line-clamp-2">{formData.description}</p>

              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <span className="text-gray-400">Pricing Mode:</span>
                {formData.is_paid ? (
                  <span className="text-amber-400 font-bold">${formData.price.toFixed(2)} Premium</span>
                ) : (
                  <span className="text-emerald-400 font-bold">100% Free Download</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Step Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono"
            >
              ← Previous Step
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-xl bg-cyan-neon hover:bg-cyan-400 text-black font-bold text-xs font-mono"
            >
              Continue to Step {step + 1} →
            </button>
          ) : (
            <button
              type="submit"
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <Save className="w-4 h-4" />
              <span>{editingProject ? 'Save Changes' : 'Publish to Vault'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
