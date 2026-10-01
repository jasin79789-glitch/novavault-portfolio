import React, { useState } from 'react';
import { Mail, Check, Trash2, ExternalLink, Clock, MessageSquare, Inbox } from 'lucide-react';
import { storageAdapter } from '../../services/storageAdapter';

export const InquiryInbox = () => {
  const [inquiries, setInquiries] = useState(storageAdapter.getInquiries());

  const refresh = () => setInquiries(storageAdapter.getInquiries());

  const handleToggleRead = (id, currentRead) => {
    storageAdapter.markInquiryRead(id, !currentRead);
    refresh();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this message permanently?')) {
      storageAdapter.deleteInquiry(id);
      refresh();
    }
  };

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Client Inquiry Repository</h3>
          <p className="text-xs text-gray-400 font-mono">
            {unreadCount} Unread • {inquiries.length} Total Messages
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center">
          <Inbox className="w-12 h-12 mx-auto text-gray-600 mb-3" />
          <h4 className="font-semibold text-white">No Inquiries Found</h4>
          <p className="text-xs text-gray-400 mt-1">
            New contact submissions will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => {
            const mailtoHref = `mailto:${inq.email}?subject=${encodeURIComponent(
              `Re: ${inq.projectType} [NovaVault Inbound]`
            )}&body=${encodeURIComponent(`Hi ${inq.name},\n\nThank you for reaching out via NovaVault regarding: ${inq.projectType}.\n\n`)}`;

            return (
              <div
                key={inq.id}
                className={`p-6 rounded-2xl border transition-all ${
                  inq.read
                    ? 'glass-panel border-white/5 opacity-75'
                    : 'glass-panel border-cyan-neon/30 bg-surface/90 shadow-[0_4px_25px_rgba(0,245,255,0.08)]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                        inq.read
                          ? 'bg-white/5 text-gray-400'
                          : 'bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/40'
                      }`}
                    >
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm sm:text-base">{inq.name}</span>
                        {!inq.read && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-neon/20 text-cyan-neon border border-cyan-neon/30">
                            NEW
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-cyan-neon/80 font-mono">{inq.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(inq.created_at).toLocaleString()}</span>
                  </div>
                </div>

                {/* Project Category Tag */}
                <div className="mb-3">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300">
                    Category: {inq.projectType}
                  </span>
                </div>

                {/* Message Body */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-4 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  {inq.message}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleToggleRead(inq.id, inq.read)}
                    className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Check className={`w-3.5 h-3.5 ${inq.read ? 'text-emerald-400' : 'text-gray-500'}`} />
                    <span>{inq.read ? 'Mark as Unread' : 'Mark as Read'}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={mailtoHref}
                      className="px-4 py-1.5 rounded-lg bg-cyan-neon hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-neon-cyan/30"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>

                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
