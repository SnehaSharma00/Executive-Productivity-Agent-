import React from 'react';
import { X, Mail, Users, Mic, Calendar, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { ActionItem, EvidenceItem } from '../types';

interface EvidenceModalProps {
  action: ActionItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ action, isOpen, onClose }) => {
  if (!isOpen || !action) return null;

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'email':      return <Mail className="w-3.5 h-3.5" style={{ color: '#0284C7' }} />;
      case 'meeting':    return <Users className="w-3.5 h-3.5" style={{ color: '#800000' }} />;
      case 'voice_note': return <Mic className="w-3.5 h-3.5" style={{ color: '#D97706' }} />;
      case 'calendar':   return <Calendar className="w-3.5 h-3.5" style={{ color: '#800000' }} />;
      default:           return <ExternalLink className="w-3.5 h-3.5" style={{ color: '#6B7280' }} />;
    }
  };

  const getSourceBadgeStyle = (type: string) => {
    switch (type) {
      case 'email':      return { backgroundColor: '#F0F9FF', color: '#0284C7', border: '1px solid #BAE6FD' };
      case 'meeting':    return { backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' };
      case 'voice_note': return { backgroundColor: '#FFFBEB', color: '#D97706', border: '1px solid #FDE68A' };
      case 'calendar':   return { backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' };
      default:           return { backgroundColor: '#F9FAFB', color: '#6B7280', border: '1px solid #E5E7EB' };
    }
  };

  const evidenceList: EvidenceItem[] = action.knownEvidence || action.evidence || [];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(17, 24, 39, 0.6)', backdropFilter: 'blur(3px)' }}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderTop: '4px solid #800000',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-start justify-between"
          style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#FAF3F3' }}
        >
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                style={{ backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000' }}
              >
                Source Evidence Trail
              </span>
              <span className="text-xs" style={{ color: '#6B7280' }}>
                • {evidenceList.length} Recorded Citation(s)
              </span>
            </div>
            <h3 className="text-base font-bold leading-snug" style={{ color: '#111827' }}>
              {action.title}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>{action.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md transition-colors cursor-pointer"
            style={{ color: '#6B7280', backgroundColor: 'transparent' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#F5E6E6';
              (e.currentTarget as HTMLElement).style.color = '#800000';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#6B7280';
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta strip */}
        <div
          className="px-6 py-2.5 text-xs flex flex-wrap items-center gap-4"
          style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB', color: '#374151' }}
        >
          <div>
            <span style={{ color: '#6B7280' }}>Status: </span>
            <span className="font-bold uppercase" style={{ color: '#800000' }}>{action.status}</span>
          </div>
          <div>
            <span style={{ color: '#6B7280' }}>Owner: </span>
            <span className="font-bold" style={{ color: action.owner === 'Unclear' ? '#D97706' : '#111827' }}>
              {action.owner}
            </span>
          </div>
          <div>
            <span style={{ color: '#6B7280' }}>Deadline: </span>
            <span className="font-bold" style={{ color: '#111827' }}>{action.deadlineLabel}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#6B7280' }}>
            <ShieldCheck className="w-4 h-4" style={{ color: '#800000' }} />
            <span>Why does the agent think this? Chronological Evolution:</span>
          </div>

          <div className="relative pl-6 space-y-4">
            {/* Timeline connector line */}
            <div
              className="absolute left-2 top-2 bottom-2 w-0.5 rounded-full"
              style={{ backgroundColor: '#E5E7EB' }}
            />

            {evidenceList.map((item, idx) => (
              <div key={`${item.sourceId}-${idx}`} className="relative group">
                {/* Maroon dot */}
                <div
                  className="absolute -left-6 top-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FFFFFF', border: '2px solid #800000' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#800000' }} />
                </div>

                <div
                  className="p-3.5 rounded-lg transition-all"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(128, 0, 0, 0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md"
                        style={getSourceBadgeStyle(item.sourceType)}
                      >
                        {getSourceIcon(item.sourceType)}
                        <span className="capitalize">{item.sourceType.replace('_', ' ')}</span>
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#374151' }}>{item.displayTime}</span>
                    </div>
                    {item.sourceId && (
                      <span className="text-[10px] font-mono" style={{ color: '#9CA3AF' }}>{item.sourceId}</span>
                    )}
                  </div>

                  <div className="text-xs mb-2 flex items-center gap-1.5">
                    <span className="font-semibold" style={{ color: '#374151' }}>{item.from}</span>
                    {item.to && (
                      <>
                        <ArrowRight className="w-3 h-3" style={{ color: '#800000' }} />
                        <span style={{ color: '#6B7280' }}>{item.to}</span>
                      </>
                    )}
                  </div>

                  <div
                    className="p-2.5 rounded text-xs font-mono leading-relaxed italic"
                    style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#374151' }}
                  >
                    "{item.evidence}"
                  </div>

                  {item.note && (
                    <div className="mt-1.5 text-[11px] font-bold" style={{ color: '#800000' }}>
                      Note: {item.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 flex items-center justify-between text-xs"
          style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#FAF3F3', color: '#6B7280' }}
        >
          <span>Source Grounding: Data Pack Artifacts</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md font-bold transition-all cursor-pointer"
            style={{ backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#5C0000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#800000'; }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceModal;
