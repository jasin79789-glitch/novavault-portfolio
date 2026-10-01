import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle2, Copy, Check, HardDrive, Trash2 } from 'lucide-react';

export const FileUploader = () => {
  const [bucket, setBucket] = useState('project-files'); // 'project-files' | 'project-media'
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const [files, setFiles] = useState([
    {
      name: 'aetheros-v1.4.2-source.zip',
      size: '18.4 MB',
      bucket: 'project-files',
      url: 'https://novavault.storage.supabase.co/v1/object/public/project-files/aetheros-v1.4.2-source.zip',
      date: '2026-10-01'
    },
    {
      name: 'hypervault-ui-kit.zip',
      size: '12.2 MB',
      bucket: 'project-files',
      url: 'https://novavault.storage.supabase.co/v1/object/public/project-files/hypervault-ui-kit.zip',
      date: '2026-09-28'
    },
    {
      name: 'aetheros-hero-preview.mp4',
      size: '4.8 MB',
      bucket: 'project-media',
      url: 'https://novavault.storage.supabase.co/v1/object/public/project-media/aetheros-hero-preview.mp4',
      date: '2026-09-25'
    }
  ]);

  const handleSimulatedUpload = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);

          // Add to files list
          const newFileItem = {
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            bucket,
            url: `https://novavault.storage.cloud/v1/${bucket}/${file.name}`,
            date: new Date().toISOString().split('T')[0]
          };

          setFiles((current) => [newFileItem, ...current]);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleCopy = (url, idx) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleDelete = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Cloud Storage Bucket Uploader</h3>
          <p className="text-xs text-gray-400 font-mono">Upload ZIP release packages and media assets</p>
        </div>

        {/* Bucket Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl glass-panel border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setBucket('project-files')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              bucket === 'project-files'
                ? 'bg-cyan-neon text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            project-files (ZIP/Bundles)
          </button>
          <button
            onClick={() => setBucket('project-media')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              bucket === 'project-media'
                ? 'bg-violet-electric text-black font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            project-media (Images/MP4)
          </button>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleSimulatedUpload(e.dataTransfer.files);
        }}
        className="glass-panel border-2 border-dashed border-white/20 hover:border-cyan-neon/50 rounded-3xl p-8 sm:p-12 text-center transition-colors cursor-pointer relative overflow-hidden"
      >
        <input
          type="file"
          onChange={(e) => handleSimulatedUpload(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <div className="w-16 h-16 rounded-2xl bg-cyan-neon/15 text-cyan-neon flex items-center justify-center mx-auto mb-4 border border-cyan-neon/30">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h4 className="font-display font-semibold text-base text-white mb-1">
          Drag and drop assets here, or click to browse
        </h4>
        <p className="text-xs text-gray-400 font-mono mb-4">
          Target Bucket: <span className="text-cyan-neon font-bold">{bucket}</span> (Supports .ZIP, .TAR, .MP4, .WEBP, .PNG)
        </p>

        {uploading && (
          <div className="max-w-md mx-auto space-y-2 mt-4">
            <div className="flex justify-between text-xs font-mono text-gray-400">
              <span>Streaming to {bucket}...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-neon rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Files Bucket List */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
          <span>Active Files in Bucket</span>
          <span>{files.length} Assets Registered</span>
        </div>

        <div className="divide-y divide-white/5">
          {files.map((file, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-neon flex-shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{file.name}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {file.size} • Bucket: {file.bucket} • {file.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleCopy(file.url, idx)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIdx === idx ? 'Copied' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
