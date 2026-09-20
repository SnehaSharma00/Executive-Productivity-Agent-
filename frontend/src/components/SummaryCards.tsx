import React from 'react';
import { AlertCircle, Hourglass, HelpCircle, CheckCircle2 } from 'lucide-react';
import { BriefMetrics } from '../types';

interface SummaryCardsProps {
  metrics: BriefMetrics;
  onFilterClick?: (sectionId: string) => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ metrics, onFilterClick }) => {
  const cards = [
    {
      id: 'section-todays-actions',
      label: "Today's Actions",
      count: metrics.todaysActionsCount,
      icon: CheckCircle2,
      iconColor: '#800000',
      iconBg: '#FAF3F3',
      iconBorder: '#F5E6E6',
      badgeText: 'Action Required',
      badgeBg: '#800000',
      badgeColor: '#FFFFFF',
      badgeBorder: '#5C0000',
      description: 'Priorities for Arjun today',
      borderColor: '#aeaeaf',
      accentColor: '#800000',
    },
    {
      id: 'section-waiting-on-others',
      label: 'Waiting on Others',
      count: metrics.waitingOnOthersCount,
      icon: Hourglass,
      iconColor: '#0284C7',
      iconBg: '#F0F9FF',
      iconBorder: '#BAE6FD',
      badgeText: 'Delegated',
      badgeBg: '#0EA5E9',
      badgeColor: '#FFFFFF',
      badgeBorder: '#0284C7',
      description: 'Pending external deliverables',
      borderColor: '#aeaeaf',
      accentColor: '#0EA5E9',
    },
    {
      id: 'section-overdue',
      label: 'Overdue Items',
      count: metrics.overdueCount,
      icon: AlertCircle,
      iconColor: metrics.overdueCount > 0 ? '#DC2626' : '#9CA3AF',
      iconBg: metrics.overdueCount > 0 ? '#FFF1F2' : '#F9FAFB',
      iconBorder: metrics.overdueCount > 0 ? '#FCA5A5' : '#aeaeaf',
      badgeText: metrics.overdueCount > 0 ? 'Overdue!' : 'On Track',
      badgeBg: metrics.overdueCount > 0 ? '#DC2626' : '#6B7280',
      badgeColor: '#FFFFFF',
      badgeBorder: metrics.overdueCount > 0 ? '#B91C1C' : '#4B5563',
      description: 'Past deadline commitments',
      borderColor: metrics.overdueCount > 0 ? '#FCA5A5' : '#aeaeaf',
      accentColor: metrics.overdueCount > 0 ? '#DC2626' : '#9CA3AF',
      highlight: metrics.overdueCount > 0,
    },
    {
      id: 'section-unclear-ownership',
      label: 'Unclear Ownership',
      count: metrics.unclearOwnershipCount,
      icon: HelpCircle,
      iconColor: '#D97706',
      iconBg: '#FFFBEB',
      iconBorder: '#FDE68A',
      badgeText: 'Unassigned',
      badgeBg: '#F59E0B',
      badgeColor: '#FFFFFF',
      badgeBorder: '#D97706',
      description: 'Flagged, needs assignment',
      borderColor: '#aeaeaf',
      accentColor: '#F59E0B',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onFilterClick && onFilterClick(card.id)}
            className="p-4 rounded-xl cursor-pointer transition-all duration-150"
            style={{
              backgroundColor: '#FFFFFF',
              border: `1px solid ${card.borderColor}`,
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(128, 0, 0, 0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
              (e.currentTarget as HTMLElement).style.borderColor = card.borderColor;
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: card.iconBg,
                  border: `1px solid ${card.iconBorder}`,
                  color: card.iconColor,
                }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: card.badgeBg,
                  color: card.badgeColor,
                  border: `1px solid ${card.badgeBorder}`,
                }}
              >
                {card.badgeText}
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight" style={{ color: '#111827' }}>
                {card.count}
              </div>
              <div className="text-xs font-bold mt-0.5" style={{ color: '#374151' }}>
                {card.label}
              </div>
            </div>
            <p className="text-[11px] mt-1 line-clamp-1" style={{ color: '#6B7280' }}>
              {card.description}
            </p>
            {/* Indicator accent line */}
            <div
              className="mt-3 h-0.5 rounded-full"
              style={{ backgroundColor: card.accentColor, opacity: 0.7 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
