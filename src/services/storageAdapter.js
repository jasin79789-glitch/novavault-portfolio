import { INITIAL_PROJECTS, INITIAL_AI_KNOWLEDGE } from '../data/seedProjects';
import { getSupabaseClient } from './supabaseClient';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';

const STORAGE_KEYS = {
  PROJECTS: 'novavault_projects_v1',
  INQUIRIES: 'novavault_inquiries_v1',
  AI_KNOWLEDGE: 'novavault_ai_knowledge_v1',
  BACKEND_CONFIG: 'novavault_backend_config_v1',
  ADMIN_AUTH: 'novavault_admin_auth_v1',
};

// Dispatch custom event for cross-component reactivity
const notifyUpdate = (type, data = null) => {
  window.dispatchEvent(new CustomEvent('novavault:store_update', { detail: { type, data } }));
};

// Helper to get active Supabase client if configured
const getActiveSupabase = () => {
  try {
    const config = storageAdapter.getBackendConfig();
    const url = config.supabaseUrl || import.meta.env.VITE_SUPABASE_URL;
    const anonKey = config.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (url && anonKey) {
      return getSupabaseClient(url, anonKey);
    }
  } catch (e) {
    console.warn('Supabase client initialization skipped:', e.message);
  }
  return null;
};

export const storageAdapter = {
  // --- PROJECTS ---
  getProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        // Trigger background sync if Supabase is active
        this.syncFromSupabase();
        return INITIAL_PROJECTS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.error('Failed to load projects from storage:', err);
      return INITIAL_PROJECTS;
    }
  },

  async syncFromSupabase() {
    const supabase = getActiveSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase projects sync query warning:', error.message);
        return null;
      }

      if (data && data.length > 0) {
        // Map database columns to app model if needed
        const mapped = data.map((p) => ({
          ...p,
          features: Array.isArray(p.features) ? p.features : (p.features ? JSON.parse(p.features) : []),
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? JSON.parse(p.tags) : []),
          gallery_urls: Array.isArray(p.gallery_urls) ? p.gallery_urls : (p.gallery_urls ? JSON.parse(p.gallery_urls) : []),
        }));

        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(mapped));
        notifyUpdate('projects', mapped);
        return mapped;
      }
    } catch (err) {
      console.warn('Could not sync projects from Supabase:', err.message);
    }
    return null;
  },

  getProjectBySlug(slug) {
    const projects = this.getProjects();
    return projects.find((p) => p.slug === slug);
  },

  async saveProject(project) {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex((p) => p.id === project.id);
    let updated;
    const nowIso = new Date().toISOString();

    const normalizedProject = {
      ...project,
      id: project.id || 'proj-' + Date.now(),
      created_at: project.created_at || nowIso,
      updated_at: nowIso,
      download_count: project.download_count || 0,
      tags: project.tags || [],
      features: project.features || [],
      gallery_urls: project.gallery_urls || [],
    };

    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = { ...updated[existingIndex], ...normalizedProject };
    } else {
      updated = [normalizedProject, ...projects];
    }

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyUpdate('projects');

    // Sync to Supabase if connected
    const supabase = getActiveSupabase();
    if (supabase) {
      try {
        await supabase.from('projects').upsert({
          id: normalizedProject.id,
          title: normalizedProject.title,
          slug: normalizedProject.slug,
          tagline: normalizedProject.tagline,
          description: normalizedProject.description,
          category: normalizedProject.category,
          tags: normalizedProject.tags,
          thumbnail_url: normalizedProject.thumbnail_url,
          gallery_urls: normalizedProject.gallery_urls,
          video_preview_url: normalizedProject.video_preview_url,
          download_file_url: normalizedProject.download_file_url,
          file_size: normalizedProject.file_size,
          is_paid: !!normalizedProject.is_paid,
          price: Number(normalizedProject.price || 0),
          checkout_url: normalizedProject.checkout_url,
          featured: !!normalizedProject.featured,
          download_count: normalizedProject.download_count,
          live_demo_url: normalizedProject.live_demo_url,
          features: normalizedProject.features,
          updated_at: nowIso,
        });
      } catch (err) {
        console.warn('Failed to upsert project to Supabase:', err.message);
      }
    }

    return updated;
  },

  async deleteProject(id) {
    const projects = this.getProjects();
    const updated = projects.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    notifyUpdate('projects');

    const supabase = getActiveSupabase();
    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Failed to delete project from Supabase:', err.message);
      }
    }

    return updated;
  },

  async incrementDownloadCount(id) {
    const projects = this.getProjects();
    const target = projects.find((p) => p.id === id);
    if (target) {
      target.download_count = (target.download_count || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      notifyUpdate('projects');

      const supabase = getActiveSupabase();
      if (supabase) {
        try {
          await supabase
            .from('projects')
            .update({ download_count: target.download_count })
            .eq('id', id);
        } catch (e) {
          // ignore background metric fail
        }
      }
    }
  },

  // --- INQUIRIES ---
  getInquiries() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (!data) {
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
        this.syncInquiriesFromSupabase();
        return samples;
      }
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  },

  async syncInquiriesFromSupabase() {
    const supabase = getActiveSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase inquiries sync warning:', error.message);
        return null;
      }

      if (data && data.length > 0) {
        const mapped = data.map((d) => ({
          ...d,
          projectType: d.project_type || d.projectType || 'General Consultation',
        }));
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(mapped));
        notifyUpdate('inquiries', mapped);
        return mapped;
      }
    } catch (err) {
      console.warn('Could not sync inquiries from Supabase:', err.message);
    }
    return null;
  },

  async saveInquiry(inquiry) {
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

    // Real Supabase insert if connected
    const supabase = getActiveSupabase();
    if (supabase) {
      try {
        await supabase.from('inquiries').insert({
          id: newInquiry.id,
          created_at: newInquiry.created_at,
          name: newInquiry.name,
          email: newInquiry.email,
          project_type: newInquiry.projectType,
          message: newInquiry.message,
          read: false,
        });
      } catch (err) {
        console.warn('Failed to insert inquiry into Supabase:', err.message);
      }
    }

    // Optional Formspree / Webhook forwarding if configured in backendConfig
    const config = this.getBackendConfig();
    if (config.webhookUrl) {
      try {
        fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInquiry),
        }).catch(() => {});
      } catch (e) {
        // silent background forward
      }
    }

    return newInquiry;
  },

  async markInquiryRead(id, isRead = true) {
    const inquiries = this.getInquiries();
    const target = inquiries.find((i) => i.id === id);
    if (target) {
      target.read = isRead;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      notifyUpdate('inquiries');

      const supabase = getActiveSupabase();
      if (supabase) {
        try {
          await supabase.from('inquiries').update({ read: isRead }).eq('id', id);
        } catch (e) {
          console.warn('Failed to update inquiry in Supabase:', e.message);
        }
      }
    }
  },

  async deleteInquiry(id) {
    const inquiries = this.getInquiries();
    const updated = inquiries.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    notifyUpdate('inquiries');

    const supabase = getActiveSupabase();
    if (supabase) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (e) {
        console.warn('Failed to delete inquiry from Supabase:', e.message);
      }
    }

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
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
        supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
        firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
        firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
        geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
        webhookUrl: '',
        contactEmail: 'm.abdullah79789@gmail.com',
      };
    } catch (err) {
      return {
        activeProvider: 'local',
        contactEmail: 'm.abdullah79789@gmail.com',
      };
    }
  },

  saveBackendConfig(config) {
    localStorage.setItem(STORAGE_KEYS.BACKEND_CONFIG, JSON.stringify(config));
    notifyUpdate('backend_config');

    // Trigger immediate sync if provider switched to Supabase
    if (config.activeProvider === 'supabase' && config.supabaseUrl && config.supabaseAnonKey) {
      this.syncFromSupabase();
      this.syncInquiriesFromSupabase();
    }

    return config;
  },

  // --- SUPABASE TEST CONNECTION & SEEDING UTILITIES ---
  async testSupabaseConnection(url, anonKey) {
    try {
      const client = getSupabaseClient(url, anonKey);
      if (!client) {
        return { ok: false, message: 'Invalid URL or Anon Key syntax.' };
      }

      // Try selecting from projects table
      const { data, error } = await client.from('projects').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          return {
            ok: false,
            tableMissing: true,
            message: 'Connected to Supabase project, but "projects" table does not exist yet. Please run the SQL schema.',
          };
        }
        return { ok: false, message: `Supabase Error: ${error.message}` };
      }

      return {
        ok: true,
        message: 'Successfully connected! PostgreSQL database & tables are verified active.',
        recordCount: data ? data.length : 0,
      };
    } catch (err) {
      return { ok: false, message: `Connection failed: ${err.message}` };
    }
  },

  async seedSupabaseWithLocalProjects(url, anonKey) {
    try {
      const client = getSupabaseClient(url, anonKey);
      if (!client) throw new Error('Could not initialize Supabase client');

      const projects = this.getProjects();
      const records = projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        category: p.category,
        tags: p.tags,
        thumbnail_url: p.thumbnail_url,
        gallery_urls: p.gallery_urls,
        video_preview_url: p.video_preview_url,
        download_file_url: p.download_file_url,
        file_size: p.file_size,
        is_paid: !!p.is_paid,
        price: Number(p.price || 0),
        checkout_url: p.checkout_url || '',
        featured: !!p.featured,
        download_count: p.download_count || 0,
        live_demo_url: p.live_demo_url || '',
        features: p.features || [],
        created_at: p.created_at || new Date().toISOString(),
      }));

      const { data, error } = await client.from('projects').upsert(records);
      if (error) throw error;

      return { ok: true, count: records.length };
    } catch (err) {
      return { ok: false, message: err.message };
    }
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

  // --- REAL CLIENT-SIDE ZIP PACKAGE GENERATOR & DOWNLOAD TRIGGER ---
  async triggerDirectDownload(project) {
    this.incrementDownloadCount(project.id);

    try {
      // Confetti burst for rewarding user experience
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00F5FF', '#8B5CF6', '#10B981', '#F59E0B']
        });
      } catch (e) {
        // ignore confetti errors
      }

      const zip = new JSZip();

      // 1. README.md
      const readmeContent = `# ${project.title}
> ${project.tagline || 'Production-Ready Digital Asset from NovaVault'}

**Creator:** Muhammad Abdullah  
**Category:** ${project.category}  
**Package Size:** ${project.file_size || 'Full Release'}  
**Release Date:** ${new Date().toISOString().split('T')[0]}  
**License:** ${project.is_paid ? 'Commercial Pro License' : 'MIT License (Open Source)'}  

---

## 📌 Project Overview
${project.description}

---

## ✨ Key Features & Architecture
${(project.features || []).map((f) => `- ${f}`).join('\n')}

---

## 🛠️ Tech Stack & Dependencies
${(project.tags || []).map((t) => `- \`${t}\``).join('\n')}

---

## 🚀 Quick Setup & Installation

\`\`\`bash
# 1. Unzip the package archive
# 2. Open project in your terminal:
cd ${project.slug || 'novavault-project'}

# 3. Install required node dependencies:
npm install

# 4. Start local development server:
npm run dev
\`\`\`

---

## 📬 Contact & Support
- **Author:** Muhammad Abdullah
- **Email:** m.abdullah79789@gmail.com
- **GitHub:** https://github.com/nextlevelbuilder
- **NovaVault Showcase:** Live Digital Asset Archive

Thank you for downloading from **NovaVault**!
`;

      zip.file('README.md', readmeContent);

      // 2. package.json
      const packageJsonContent = {
        name: project.slug || 'novavault-asset',
        version: '1.0.0',
        private: true,
        description: project.description,
        author: 'Muhammad Abdullah <m.abdullah79789@gmail.com>',
        license: project.is_paid ? 'SEE LICENSE IN LICENSE.txt' : 'MIT',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview'
        },
        keywords: project.tags || ['creative-tech', 'webgl', 'react']
      };
      zip.file('package.json', JSON.stringify(packageJsonContent, null, 2));

      // 3. LICENSE.txt
      const licenseContent = `MIT License

Copyright (c) ${new Date().getFullYear()} Muhammad Abdullah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
      zip.file('LICENSE.txt', licenseContent);

      // 4. Starter Source Code: src/index.js / src/manifest.json
      const manifestContent = {
        id: project.id,
        title: project.title,
        slug: project.slug,
        version: '1.0.0',
        category: project.category,
        tags: project.tags,
        features: project.features,
        verified_download: true,
        exported_at: new Date().toISOString()
      };
      zip.file('manifest.json', JSON.stringify(manifestContent, null, 2));

      const starterIndexJs = `// ${project.title} - Starter Entry Point
// Author: Muhammad Abdullah (NovaVault)

export const assetConfig = ${JSON.stringify(manifestContent, null, 2)};

export function initializeAsset(container) {
  console.log('⚡ Initializing ${project.title}...');
  // Modular mounting logic for ${project.category}
  return {
    status: 'mounted',
    project: '${project.title}',
    timestamp: Date.now()
  };
}
`;
      zip.folder('src').file('index.js', starterIndexJs);

      // Generate the real ZIP Blob
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.slug || 'novavault-package'}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      return true;
    } catch (err) {
      console.error('Failed to build ZIP archive:', err);
      // Fallback to text bundle if ZIP building encounters issues
      this.triggerTextBundleFallback(project);
      return false;
    }
  },

  triggerTextBundleFallback(project) {
    const content = `=====================================================
NovaVault Digital Asset Package
Project: ${project.title}
Version: 1.0.0 (Production Release)
Creator: Muhammad Abdullah <m.abdullah79789@gmail.com>
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
Inquiries: m.abdullah79789@gmail.com
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
