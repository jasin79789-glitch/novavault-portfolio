import { INITIAL_PROJECTS, INITIAL_AI_KNOWLEDGE } from '../data/seedProjects';

const STORAGE_KEYS = {
  PROJECTS: 'novavault_projects_v1',
  INQUIRIES: 'novavault_inquiries_v1',
  AI_KNOWLEDGE: 'novavault_ai_knowledge_v1',
  BACKEND_CONFIG: 'novavault_backend_config_v1',
  ADMIN_AUTH: 'novavault_admin_auth_v1',
};

// Dispatch custom event for cross-component reactivity
const notifyUpdate = (type) => {
  window.dispatchEvent(new CustomEvent('novavault:store_update', { detail: { type } }));
};

export const storageAdapter = {
  // --- PROJECTS ---
  getProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load projects from storage:', err);
      return INITIAL_PROJECTS;
    }
  },

  getProjectBySlug(slug) {
    const projects = this.getProjects();
    return projects.find((p) => p.slug === slug);
  },

  saveProject(project) {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let updated;

    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = { ...updated[existingIndex], ...project, updated_at: new Date().toISOString() };
    } else {
      const newProj = {
        ...project,
        id: project.id || 'proj-' + Date.now(),
        created_at: new Date().toISOString(),
        download_count: project.download_count || 0,
      };
      updated = [newProj, ...projects];
    }

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyUpdate('projects');
    return updated;
  },

  deleteProject(id) {
    const projects = this.getProjects();
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyUpdate('projects');
    return updated;
  },

  incrementDownloadCount(id) {
    const projects = this.getProjects();
    const target = projects.find((p) => p.id === id);
    if (target) {
      target.download_count = (target.download_count || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      notifyUpdate('projects');
    }
  },

  // --- INQUIRIES ---
  getInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
        // Preload sample inquiries for demo
        const samples = [
          {
            id: 'inq-1',
            name: 'Sarah Chen',
            email: 'sarah.chen@futurecraft.design',
            projectType: '3D Web Experience',
            message: 'Loved your AetherOS concept! We are building a Web3 spatial platform and would love to consult with you on shader optimization.',
            created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
            read: false,
          },
          {
            id: 'inq-2',
            name: 'Marcus Vance',
            email: 'marcus@hypergrowth.ai',
            projectType: 'Design System',
            message: 'Inquiring about a commercial custom license for HyperVault Pro UI Kit for our upcoming enterprise platform.',
            created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
            read: true,
          }
        ];
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(samples));
        return samples;
      }
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  saveInquiry(inquiry) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      created_at: new Date().toISOString(),
      read: false,
      ...inquiry,
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifyUpdate('inquiries');
    return newInquiry;
  },

  markInquiryRead(id, isRead = true) {
    const inquiries = this.getInquiries();
    const target = inquiries.find((i) => i.id === id);
    if (target) {
      target.read = isRead;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      notifyUpdate('inquiries');
    }
  },

  deleteInquiry(id) {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifyUpdate('inquiries');
    return updated;
  },

  // --- AI KNOWLEDGE ---
  getAIKnowledge() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_KNOWLEDGE);
      return data ? JSON.parse(data) : INITIAL_AI_KNOWLEDGE;
    } catch (err) {
      return INITIAL_AI_KNOWLEDGE;
    }
  },

  saveAIKnowledge(knowledge) {
    localStorage.setItem(STORAGE_KEYS.AI_KNOWLEDGE, JSON.stringify(knowledge));
    notifyUpdate('ai_knowledge');
    return knowledge;
  },

  // --- BACKEND CONFIG ---
  getBackendConfig() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BACKEND_CONFIG);
      return data ? JSON.parse(data) : {
        activeProvider: 'local', // 'local' | 'supabase' | 'firebase'
        supabaseUrl: '',
        supabaseAnonKey: '',
        firebaseApiKey: '',
        firebaseProjectId: '',
        geminiApiKey: '',
      };
    } catch (err) {
      return { activeProvider: 'local' };
    }
  },

  saveBackendConfig(config) {
    localStorage.setItem(STORAGE_KEYS.BACKEND_CONFIG, JSON.stringify(config));
    notifyUpdate('backend_config');
    return config;
  },

  // --- ADMIN AUTH STATE ---
  getAdminAuth() {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
    } catch (e) {
      return false;
    }
  },

  setAdminAuth(isAuthenticated) {
    if (isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
    notifyUpdate('admin_auth');
  },

  // --- CLIENT-SIDE INSTANT DOWNLOAD TRIGGER ---
  triggerDirectDownload(project) {
    this.incrementDownloadCount(project.id);

    // Create a real downloadable text bundle formatted as an asset package
    const content = `=====================================================
NovaVault Digital Asset Package
Project: ${project.title}
Version: 1.0.0 (Production Release)
Creator: Muhammad Abdullah
License: MIT Open License / Personal & Commercial Use
Downloaded At: ${new Date().toUTCString()}
=====================================================

ABOUT THIS ASSET:
${project.description}

TAGS & TECHNOLOGIES:
${(project.tags || []).join(', ')}

DOCUMENTED FEATURES:
${(project.features || []).map((f) => `- ${f}`).join('\n')}

QUICK START:
1. Extract contents to your workspace.
2. Run \`npm install\` to resolve all dependencies.
3. Start local development with \`npm run dev\`.

SUPPORT & CONNECT:
GitHub: https://github.com/nextlevelbuilder
Portfolio: NovaVault Showcase
Inquiries: abdullah@example.com

Thank you for downloading from NovaVault!
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.slug || 'novavault-asset'}-bundle.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
