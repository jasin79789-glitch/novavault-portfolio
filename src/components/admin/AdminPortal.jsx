import React, { useState } from 'react';
import {
  Layers,
  PlusCircle,
  UploadCloud,
  MessageSquare,
  Bot,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Download,
  Database
} from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';
import { ProjectManager } from './ProjectManager';
import { ProjectCreator } from './ProjectCreator';
import { FileUploader } from './FileUploader';
import { AIKnowledgeSync } from './AIKnowledgeSync';
import { InquiryInbox } from './InquiryInbox';
import { BackendSettings } from './BackendSettings';

export const AdminPortal = ({ onBackToSite, onLogout }) => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'create' | 'upload' | 'inquiries' | 'ai' | 'settings'
  const [editingProject, setEditingProject] = useState(null);

  const projects = storageAdapter.getProjects();
  const inquiries = storageAdapter.getInquiries();
  const backendConfig = storageAdapter.getBackendConfig();

  const totalDownloads = projects.reduce((acc, p) => acc + (p.download_count || 0), 0);
  const unreadInquiries = inquiries.filter((i) => !i.read).length;

  const handleStartCreate = () => {
    setEditingProject(null);
    setActiveTab('create');
  };

  const handleStartEdit = (project) => {
    setEditingProject(project);
    setActiveTab('create');
  };

  const handleSavedProject = () => {
    setEditingProject(null);
    setActiveTab('projects');
  };

  return (
    <div className="min-h-screen bg-background text-[#F8F9FA] flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-surface/90 backdrop-blur-xl px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-neon/15 border border-cyan-neon/30 flex items-center justify-center text-cyan-neon">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-base text-white tracking-wide">NovaVault Console</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                Provider: <strong className="text-white capitalize">{backendConfig.activeProvider || 'Local'}</strong>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-3.5 py-1.5 rounded-xl glass-panel hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors border border-white/10"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl glass-panel hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors border border-white/10"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          {/* Metrics Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400">Vault Telemetry</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xl font-bold font-display text-white">{projects.length}</span>
                <span className="text-[10px] text-gray-500 font-mono block">ASSETS</span>
              </div>
              <div>
                <span className="text-xl font-bold font-display text-cyan-neon">{totalDownloads}</span>
                <span className="text-[10px] text-gray-500 font-mono block">DOWNLOADS</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 glass-panel p-2 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4" />
                <span>Project Manager</span>
              </div>
              <span className="text-[11px] font-mono opacity-80">{projects.length}</span>
            </button>

            <button
              onClick={handleStartCreate}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'create'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{editingProject ? 'Edit Project' : 'New Project'}</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>File Storage Uploader</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Inquiry Inbox</span>
              </div>
              {unreadInquiries > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-neon text-black font-bold">
                  {unreadInquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Knowledge Sync</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-cyan-neon text-black font-bold shadow-neon-cyan/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Backend & Cloud</span>
            </button>
          </nav>
        </aside>

        {/* Content View Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'projects' && (
            <ProjectManager onNewProject={handleStartCreate} onEditProject={handleStartEdit} />
          )}

          {activeTab === 'create' && (
            <ProjectCreator
              editingProject={editingProject}
              onBack={() => setActiveTab('projects')}
              onSaved={handleSavedProject}
            />
          )}

          {activeTab === 'upload' && <FileUploader />}

          {activeTab === 'inquiries' && <InquiryInbox />}

          {activeTab === 'ai' && <AIKnowledgeSync />}

          {activeTab === 'settings' && <BackendSettings />}
        </main>
      </div>
    </div>
  );
};
