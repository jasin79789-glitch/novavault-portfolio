import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Layers } from 'lucide-react';

export const ProjectGrid = ({ projects, onInspect }) => {
  if (projects.length === 0) {
    return (
      <div className="py-20 text-center glass-panel rounded-2xl border border-white/10 max-w-lg mx-auto p-8">
        <div className="w-12 h-12 mx-auto rounded-full bg-cyan-neon/10 flex items-center justify-center text-cyan-neon mb-4">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="font-display font-semibold text-lg text-white mb-2">No Matching Assets Found</h3>
        <p className="text-sm text-gray-400">
          Try adjusting your search criteria, switching categories, or toggling between free and premium assets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onInspect={onInspect} />
      ))}
    </div>
  );
};
