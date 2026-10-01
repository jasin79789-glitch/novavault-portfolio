import React, { useState, useEffect } from 'react';
import { storageAdapter } from './services/storageAdapter';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ProjectFilters } from './components/showcase/ProjectFilters';
import { ProjectGrid } from './components/showcase/ProjectGrid';
import { ProjectDetailModal } from './components/showcase/ProjectDetailModal';
import { AIConcierge } from './components/ai/AIConcierge';
import { CreatorSection } from './components/home/CreatorSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPortal } from './components/admin/AdminPortal';
import { Sparkles } from 'lucide-react';

export function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(storageAdapter.getAdminAuth());
  const [projects, setProjects] = useState(storageAdapter.getProjects());

  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'

  // Modal & AI States
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Listen to hash changes for SPA routing (e.g. #/admin)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to cross-component store updates
  useEffect(() => {
    const handleStoreUpdate = () => {
      setProjects(storageAdapter.getProjects());
      setIsAdminAuthenticated(storageAdapter.getAdminAuth());
    };
    window.addEventListener('novavault:store_update', handleStoreUpdate);
    return () => window.removeEventListener('novavault:store_update', handleStoreUpdate);
  }, []);

  // Filter projects logic
  const filteredProjects = projects.filter((project) => {
    // 1. Category Filter
    if (activeCategory !== 'All' && project.category !== activeCategory) {
      return false;
    }

    // 2. Price Filter
    if (priceFilter === 'free' && project.is_paid) return false;
    if (priceFilter === 'paid' && !project.is_paid) return false;

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchTagline = (project.tagline || '').toLowerCase().includes(q);
      const matchDesc = (project.description || '').toLowerCase().includes(q);
      const matchTags = (project.tags || []).some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchTagline && !matchDesc && !matchTags) {
        return false;
      }
    }

    return true;
  });

  const handleGoAdmin = () => {
    window.location.hash = '/admin';
  };

  const handleBackToSite = () => {
    window.location.hash = '';
  };

  const handleLogout = () => {
    storageAdapter.setAdminAuth(false);
    setIsAdminAuthenticated(false);
    window.location.hash = '';
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- RENDER ADMIN ROUTE ---
  if (currentRoute === '#/admin' || currentRoute === '#/admin-portal') {
    if (!isAdminAuthenticated) {
      return (
        <>
          <CustomCursor />
          <AdminLogin
            onLoginSuccess={() => setIsAdminAuthenticated(true)}
            onBackToSite={handleBackToSite}
          />
        </>
      );
    }
    return (
      <>
        <CustomCursor />
        <AdminPortal onBackToSite={handleBackToSite} onLogout={handleLogout} />
      </>
    );
  }

  // --- RENDER PUBLIC SHOWCASE ---
  return (
    <div className="relative min-h-screen bg-background text-[#F8F9FA] selection:bg-cyan-neon selection:text-black">
      {/* Interactive Magnetic Glowing Cursor */}
      <CustomCursor />

      {/* Main Top Navigation */}
      <Navbar onOpenAI={() => setIsAIOpen(true)} onGoAdmin={handleGoAdmin} />

      {/* 3D WebGL Interactive Hero */}
      <HeroSection
        onOpenAI={() => setIsAIOpen(true)}
        onExplore={() => scrollToSection('showcase')}
      />

      {/* Dynamic Project Showcase Section */}
      <section id="showcase" className="py-20 relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-neon mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURATED DIGITAL ASSETS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mb-4">
            Interactive Work & <span className="bg-gradient-to-r from-cyan-neon to-violet-electric bg-clip-text text-transparent">Releases</span>
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base leading-relaxed">
            Download production-ready source bundles, inspect interactive 3D WebGL engines,
            and acquire premium engineering blueprints with direct browser downloads.
          </p>
        </div>

        {/* Filter Bar */}
        <ProjectFilters
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          totalResults={filteredProjects.length}
        />

        {/* Grid of 3D Tilt Cards */}
        <ProjectGrid
          projects={filteredProjects}
          onInspect={(project) => setSelectedProject(project)}
        />
      </section>

      {/* Creator & Philosophy Section */}
      <CreatorSection />

      {/* Interactive Contact & Inquiries Section */}
      <ContactSection />

      {/* Footer */}
      <Footer onGoAdmin={handleGoAdmin} />

      {/* Rich Project Inspection Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Embedded AI Portfolio Concierge Floating Drawer */}
      <AIConcierge isOpen={isAIOpen} onToggle={() => setIsAIOpen(!isAIOpen)} />
    </div>
  );
}

export default App;
