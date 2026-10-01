import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/BrandIcons';
import { storageAdapter } from '../../services/storageAdapter';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development / 3D App',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    storageAdapter.saveInquiry(formData);
    setSubmitted(true);
    setError('');
    setFormData({
      name: '',
      email: '',
      projectType: 'Web Development / 3D App',
      message: ''
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-neon/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-violet-neon/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-neon mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INBOUND DISPATCH</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">
            Initiate a <span className="bg-gradient-to-r from-cyan-neon to-violet-electric bg-clip-text text-transparent">Collaboration</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Have a custom creative engineering project, shader requirement, or enterprise licensing inquiry?
            Transmit your brief directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-white">Direct Dispatch</h4>
                  <a
                    href="mailto:m.abdullah79789@gmail.com"
                    className="text-sm text-gray-400 hover:text-cyan-neon font-light transition-colors"
                  >
                    m.abdullah79789@gmail.com
                  </a>
                  <p className="text-xs text-cyan-neon font-mono mt-1">Average Response: &lt; 24 Hours</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-violet-neon/20 border border-violet-neon/40 flex items-center justify-center text-violet-electric">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-white">Available For</h4>
                  <ul className="text-xs text-gray-300 font-mono space-y-1 mt-2">
                    <li>• Interactive 3D WebGL Web Apps</li>
                    <li>• Creative Frontend Architecture</li>
                    <li>• Bespoke Digital Asset Licensing</li>
                    <li>• Technical AI Workflow Consulting</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h5 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">Network & Repos</h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/nextlevelbuilder"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-neon transition-colors border border-white/10"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-cyan-neon transition-colors border border-white/10"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-glass">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">Transmission Recorded</h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Your inquiry has been stored securely in NovaVault's dispatch repository. Abdullah will review your brief promptly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        Your Identity / Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        Electronic Mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Engagement Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#121217] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-neon/60 transition-all"
                    >
                      <option value="Web Development / 3D App">3D WebGL / Spatial Web Experience</option>
                      <option value="Custom Design System">Design System / Frontend UI Architecture</option>
                      <option value="Digital Asset Licensing">Digital Asset Commercial Licensing</option>
                      <option value="General Consultation">General Technical Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Project Brief / Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your scope, timeline, deliverables, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-neon/60 focus:ring-1 focus:ring-cyan-neon/40 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-neon to-[#0284C7] hover:from-cyan-400 hover:to-[#0284C7] text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-neon-cyan transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
