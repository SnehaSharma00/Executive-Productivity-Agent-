import React from 'react';
import { Clock, User, AlertTriangle, CheckCircle, Hourglass, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { ActionItem } from '../types';

interface ActionCardProps {
  action: ActionItem;
  onViewEvidence: (action: ActionItem) => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({ action, onViewEvidence }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed', bg: '#F3F4F6', color: '#374151', border: '#D1D5DB', icon: CheckCircle };
      case 'overdue':
        return { label: 'Overdue', bg: '#DC2626', color: '#FFFFFF', border: '#B91C1C', icon: ShieldAlert };
      case 'waiting':
        return { label: 'Waiting on Others', bg: '#0EA5E9', color: '#FFFFFF', border: '#0284C7', icon: Hourglass };
      case 'unclear':
        return { label: 'Ownership Unclear', bg: '#F59E0B', color: '#FFFFFF', border: '#D97706', icon: AlertTriangle };
      case 'scheduled':
        return { label: 'Scheduled', bg: '#800000', color: '#FFFFFF', border: '#5C0000', icon: Clock };
      default:
        return { label: 'Open', bg: '#800000', color: '#FFFFFF', border: '#5C0000', icon: Clock };
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return { bg: '#FFF1F2', color: '#DC2626', border: '#FCA5A5' };
      case 'high':
        return { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' };
      case 'medium':
        return { bg: '#FAF3F3', color: '#800000', border: '#F5E6E6' };
      default:
        return { bg: '#F9FAFB', color: '#6B7280', border: '#E5E7EB' };
    }
  };

  const statusBadge = getStatusBadge(action.status);
  const StatusIcon = statusBadge.icon;
  const priorityStyle = getPriorityStyle(action.priority);
  const evidenceCount = action.knownEvidence?.length || action.evidence?.length || 0;

  // Border left accent color by status
  const leftAccent =
    action.status === 'overdue' ? '#DC2626' :
    action.status === 'unclear' ? '#F59E0B' :
    action.status === 'waiting' ? '#0EA5E9' :
    action.status === 'completed' ? '#9CA3AF' :
    '#800000';

  return (
    <div
      className="p-3.5 rounded-xl flex flex-col justify-between transition-all duration-150"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderLeft: `4px solid ${leftAccent}`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(128, 0, 0, 0.08)';
        (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
        (e.currentTarget as HTMLElement).style.borderLeftColor = leftAccent;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
        (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
        (e.currentTarget as HTMLElement).style.borderLeftColor = leftAccent;
      }}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Status badge */}
            <span
              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: statusBadge.bg,
                color: statusBadge.color,
                border: `1px solid ${statusBadge.border}`,
              }}
            >
              <StatusIcon className="w-3 h-3" />
              <span>{statusBadge.label}</span>
            </span>

            {/* Priority badge */}
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: priorityStyle.bg,
                color: priorityStyle.color,
                border: `1px solid ${priorityStyle.border}`,
              }}
            >
              {action.priority}
            </span>

            {/* Category badge */}
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
              style={{ backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' }}
            >
              {action.category.replace('_', ' ')}
            </span>
          </div>

          {/* Evidence button */}
          <button
            onClick={() => onViewEvidence(action)}
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer"
            style={{
              backgroundColor: '#800000',
              color: '#FFFFFF',
              border: '1px solid #5C0000',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#5C0000';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#800000';
            }}
          >
            <FileText className="w-3 h-3" />
            <span>{evidenceCount} Evidence</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Action Title */}
        <h4 className="text-sm font-bold mb-1 leading-snug" style={{ color: '#111827' }}>
          {action.title}
        </h4>

        {/* Description */}
        <p className="text-xs line-clamp-2 leading-relaxed mb-3" style={{ color: '#6B7280' }}>
          {action.description}
        </p>
      </div>

      {/* Meta Bar */}
      <div
        className="pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs"
        style={{ borderTop: '1px solid #E5E7EB', color: '#6B7280' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" style={{ color: '#800000' }} />
            <span style={{ color: '#6B7280' }}>Owner:</span>
            <span
              className="font-bold"
              style={
                action.owner === 'Unclear'
                  ? { color: '#D97706', backgroundColor: '#FFFBEB', padding: '1px 6px', borderRadius: '4px', border: '1px solid #FDE68A' }
                  : { color: '#111827' }
              }
            >
              {action.owner}
            </span>
          </div>

          {action.waitingOn && action.status !== 'completed' && (
            <div
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px]"
              style={{ backgroundColor: '#F0F9FF', color: '#0284C7', border: '1px solid #BAE6FD' }}
            >
              <span>Waiting on:</span>
              <span className="font-bold">{action.waitingOn}</span>
            </div>
          )}
        </div>

        {/* Deadline badge */}
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px]"
          style={{ backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' }}
        >
          <Clock className="w-3 h-3" style={{ color: '#800000' }} />
          <span className="font-semibold">{action.deadlineLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
