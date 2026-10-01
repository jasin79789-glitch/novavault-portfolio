import React, { useState } from 'react';
import { Search, Trash2, Edit3, Star, Download, Plus, Check, ExternalLink } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const ProjectManager = ({ onNewProject, onEditProject }) => {
  const [projects, setProjects] = useState(storageAdapter.getProjects());
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const refresh = () => setProjects(storageAdapter.getProjects());

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      storageAdapter.deleteProject(id);
      refresh();
    }
  };

  const handleToggleFeatured = (project) => {
    storageAdapter.saveProject({
      ...project,
      featured: !project.featured,
    });
    refresh();
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-neon"
          />
        </div>

        <button
          onClick={onNewProject}
          className="px-5 py-2.5 rounded-xl bg-cyan-neon hover:bg-cyan-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-neon-cyan transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Asset Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Pricing</th>
                <th className="py-3.5 px-4">Downloads</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.thumbnail_url}
                        alt={p.title}
                        className="w-10 h-10 rounded-lg object-cover bg-black flex-shrink-0"
                      />
                      <div>
                        <div className="font-semibold text-white line-clamp-1">{p.title}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{p.file_size}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10">
                      {p.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {p.is_paid ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        ${p.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        FREE
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Download className="w-3.5 h-3.5 text-cyan-neon" />
                      <span>{p.download_count}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      title="Toggle Featured"
                      className={`p-1.5 rounded-lg border transition-colors ${
                        p.featured
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                          : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEditProject(p)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-neon transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
