import React, { useState, useEffect } from 'react';
import { storageAdapter } from './services/storageAdapter';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { LeftUtilityDock } from './components/layout/LeftUtilityDock';
import { HeroSection } from './components/hero/HeroSection';
import { ProductSpotlight } from './components/showcase/ProductSpotlight';
import { ProjectDetailModal } from './components/showcase/ProjectDetailModal';
import { AIConcierge } from './components/ai/AIConcierge';
import { CreatorSection } from './components/home/CreatorSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPortal } from './components/admin/AdminPortal';

export function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(storageAdapter.getAdminAuth());
  const [projects, setProjects] = useState(storageAdapter.getProjects());

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

      {/* Pin 1 Enigma Vertical Left Utility Dock */}
      <LeftUtilityDock onGoAdmin={handleGoAdmin} />

      {/* Main Top Navigation (Pin 1 Floating Pill Dock - No Public Admin/AI Buttons) */}
      <Navbar />

      {/* 3D WebGL Interactive Hero (Pin 1 Asymmetric Bento Layout) */}
      <HeroSection onExplore={() => scrollToSection('showcase')} />

      {/* Pin 2 DualSense Interactive 3D Product Spotlight & Releases */}
      <ProductSpotlight
        projects={projects}
        onInspect={(project) => setSelectedProject(project)}
      />

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
