import React from 'react';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { MeetingItem } from '../types';

interface MeetingsSectionProps {
  meetings: MeetingItem[];
  asOfDate: string;
}

export const MeetingsSection: React.FC<MeetingsSectionProps> = ({ meetings, asOfDate }) => {
  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch { return iso; }
  };

  return (
    <div
      id="section-meetings"
      className="p-5 rounded-xl"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="p-2 rounded-lg shrink-0"
            style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}
          >
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: '#111827' }}>
              Relevant Meetings for Today
            </h3>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              Arjun Malhotra's schedule on {asOfDate}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-md"
          style={{ backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000' }}
        >
          {meetings.length} Event(s)
        </span>
      </div>

      {meetings.length === 0 ? (
        <div
          className="text-center py-6 text-xs rounded-lg"
          style={{ color: '#6B7280', backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6' }}
        >
          No scheduled calendar events for this day.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {meetings.map(m => {
            const isBlocked = m.event.toLowerCase() === 'blocked';
            return (
              <div
                key={m.id}
                className="p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: isBlocked ? '#F9FAFB' : '#FFFFFF',
                  border: isBlocked ? '1px solid #E5E7EB' : '1px solid #E5E7EB',
                }}
                onMouseEnter={e => {
                  if (!isBlocked) {
                    (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(128, 0, 0, 0.06)';
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#800000' }}>
                    <Clock className="w-3 h-3" style={{ color: '#800000' }} />
                    <span>{formatTime(m.startTime)} – {formatTime(m.endTime)}</span>
                  </div>
                  {m.relatedAction && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5"
                      style={{ backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' }}
                    >
                      <span>Action Linked</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold mb-1" style={{ color: isBlocked ? '#9CA3AF' : '#111827' }}>
                  {m.event}
                </div>

                {m.relatedAction && (
                  <div className="text-[11px] font-medium line-clamp-1" style={{ color: '#800000' }}>
                    Related: {m.relatedAction}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MeetingsSection;
