import React from 'react';
import {
  CheckCircle2,
  Hourglass,
  AlertOctagon,
  HelpCircle,
  Clock,
  ListTodo,
  FileText,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ExecutiveBrief, ActionItem } from '../types';
import { ActionCard } from './ActionCard';
import { MeetingsSection } from './MeetingsSection';
import { AskAgent } from './AskAgent';

interface DailyBriefProps {
  brief: ExecutiveBrief;
  onViewEvidence: (action: ActionItem) => void;
}

const sectionCard = (borderTopColor = '#800000') => ({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderTop: `3px solid ${borderTopColor}`,
  borderRadius: '0.75rem',
  padding: '1.25rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  fontFamily: 'Arial, Helvetica, sans-serif',
});

const iconBox = (bg = '#FAF3F3', border = '#F5E6E6', color = '#800000') => ({
  padding: '0.5rem',
  borderRadius: '0.5rem',
  backgroundColor: bg,
  border: `1px solid ${border}`,
  color,
  flexShrink: 0,
});

const sectionBadge = (bg = '#800000', color = '#FFFFFF', border = '#5C0000') => ({
  fontSize: '0.75rem',
  fontWeight: '700',
  padding: '2px 10px',
  borderRadius: '999px',
  backgroundColor: bg,
  color,
  border: `1px solid ${border}`,
});

const emptyState = {
  textAlign: 'center' as const,
  padding: '1.5rem',
  fontSize: '0.75rem',
  color: '#6B7280',
  backgroundColor: '#F9FAFB',
  borderRadius: '0.5rem',
  border: '1px solid #E5E7EB',
};

export const DailyBrief: React.FC<DailyBriefProps> = ({ brief, onViewEvidence }) => {
  return (
    <div className="space-y-6">

      {/* 1. OVERDUE ACTIONS ALERT (if any) */}
      {brief.overdue.length > 0 && (
        <section id="section-overdue" style={sectionCard('#DC2626')}>
          <div className="flex items-center gap-2.5 mb-4">
            <div style={iconBox('#FFF1F2', '#FCA5A5', '#DC2626')}>
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
                  Overdue Actions
                </h2>
                <span style={sectionBadge('#DC2626', '#FFFFFF', '#B91C1C')}>
                  {brief.overdue.length} Past Deadline
                </span>
              </div>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                Commitments whose deadline has elapsed relative to the simulated time
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {brief.overdue.map(action => (
              <ActionCard key={action.id} action={action} onViewEvidence={onViewEvidence} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 2. MAIN DASHBOARD: TWO-COLUMN EXECUTIVE LAYOUT                 */}
      {/* LEFT: Today's Actions (~60%) | RIGHT: Executive Brief (~40%)   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: TODAY'S ACTIONS (~60%) */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-4">
          <section id="section-todays-actions" style={sectionCard('#800000')}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div style={iconBox('#FAF3F3', '#F5E6E6', '#800000')}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
                      Today's Actions
                    </h2>
                    <span style={sectionBadge('#800000', '#FFFFFF', '#5C0000')}>
                      {brief.todaysActions.length} Pending Today
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                    Items requiring Arjun's immediate execution, review, or participation today
                  </p>
                </div>
              </div>
            </div>

            {brief.todaysActions.length === 0 ? (
              <div style={emptyState}>No pending action items scheduled for today.</div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
                {brief.todaysActions.map(action => (
                  <ActionCard key={action.id} action={action} onViewEvidence={onViewEvidence} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: EXECUTIVE BRIEF PANEL (~40%) */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-4">
          <div style={sectionCard('#800000')} className="space-y-4">

            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-2.5">
                <div style={iconBox('#FAF3F3', '#F5E6E6', '#800000')}>
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight" style={{ color: '#111827' }}>
                    Executive Brief
                  </h3>
                  <p className="text-[11px]" style={{ color: '#6B7280' }}>
                    Quick-read snapshot for Arjun Malhotra
                  </p>
                </div>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: '#FAF3F3', color: '#800000', border: '1px solid #F5E6E6' }}
              >
                {brief.asOfDate}
              </span>
            </div>

            {/* Executive Status Highlights */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#6B7280' }}>
                <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#800000' }} />
                <span>Daily Priority Summary</span>
              </div>

              <div
                className="p-3 rounded-lg text-xs leading-relaxed"
                style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#111827' }}
              >
                <div className="font-semibold text-xs mb-1" style={{ color: '#800000' }}>
                  {brief.todaysActions.length > 0
                    ? `Arjun has ${brief.todaysActions.length} high-priority action(s) scheduled for execution today.`
                    : 'All scheduled priorities for today are currently satisfied.'}
                </div>
                <div style={{ color: '#4B5563' }}>
                  {brief.overdue.length > 0 && (
                    <span className="font-bold block text-red-700 mt-1">
                      • {brief.overdue.length} item(s) past deadline require urgent intervention.
                    </span>
                  )}
                  {brief.unclearOwnership.length > 0 && (
                    <span className="block mt-0.5 text-amber-800">
                      • {brief.unclearOwnership.length} unassigned task(s) flagged for ownership assignment.
                    </span>
                  )}
                  {brief.relevantMeetings.length > 0 && (
                    <span className="block mt-0.5" style={{ color: '#374151' }}>
                      • {brief.relevantMeetings.length} calendar event(s) scheduled on {brief.asOfDate}.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Waiting on Others Section (Embedded compactly in Executive Brief to avoid vertical duplication) */}
            <div id="section-waiting-on-others" className="pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <Hourglass className="w-3.5 h-3.5" style={{ color: '#0284C7' }} />
                  <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#111827' }}>
                    Waiting on Others ({brief.waitingOnOthers.length})
                  </h4>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: '#F0F9FF', color: '#0284C7', border: '1px solid #BAE6FD' }}
                >
                  Delegated
                </span>
              </div>

              {brief.waitingOnOthers.length === 0 ? (
                <div
                  className="text-center py-3 text-xs rounded-lg"
                  style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', color: '#6B7280' }}
                >
                  No pending external blockers as of this time.
                </div>
              ) : (
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-0.5">
                  {brief.waitingOnOthers.map(action => (
                    <div
                      key={action.id}
                      className="p-2.5 rounded-lg text-xs space-y-1.5 transition-all"
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderLeft: '3px solid #0EA5E9',
                      }}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-bold leading-tight" style={{ color: '#111827' }}>
                          {action.title}
                        </span>
                        <button
                          onClick={() => onViewEvidence(action)}
                          className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-0.5"
                          style={{ backgroundColor: '#800000', color: '#FFFFFF' }}
                        >
                          <span>Evidence</span>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: '#6B7280' }}>
                        <div className="flex items-center gap-1">
                          <span>Waiting on:</span>
                          <span className="font-bold" style={{ color: '#0284C7' }}>
                            {action.waitingOn || 'External'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{action.deadlineLabel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Context Footer */}
            <div
              className="pt-3 flex items-center justify-between text-[11px]"
              style={{ borderTop: '1px solid #E5E7EB', color: '#6B7280' }}
            >
              <span>LangChain Grounded Status</span>
              <span className="font-semibold" style={{ color: '#800000' }}>Veridian Corp</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. MY COMMITMENTS (Directly below two-column dashboard)        */}
      {/* ============================================================== */}
      <section id="section-my-commitments" style={sectionCard('#800000')}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div style={iconBox('#FAF3F3', '#F5E6E6', '#800000')}>
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
                  My Commitments
                </h2>
                <span style={sectionBadge('#800000', '#FFFFFF', '#5C0000')}>
                  {brief.myCommitments.length} Active
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                Promises and deliverables made by Arjun to colleagues and clients
              </p>
            </div>
          </div>
        </div>
        {brief.myCommitments.length === 0 ? (
          <div style={emptyState}>No active personal commitments outstanding.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {brief.myCommitments.map(action => (
              <ActionCard key={action.id} action={action} onViewEvidence={onViewEvidence} />
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 4. UNCLEAR OWNERSHIP (if any)                                   */}
      {/* ============================================================== */}
      {brief.unclearOwnership.length > 0 && (
        <section id="section-unclear-ownership" style={sectionCard('#F59E0B')}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div style={iconBox('#FFFBEB', '#FDE68A', '#D97706')}>
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
                    Unclear Ownership
                  </h2>
                  <span style={sectionBadge('#F59E0B', '#FFFFFF', '#D97706')}>
                    {brief.unclearOwnership.length} Unresolved
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  Critical tasks where ownership is unassigned or disputed (strictly preserved as Unclear)
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {brief.unclearOwnership.map(action => (
              <ActionCard key={action.id} action={action} onViewEvidence={onViewEvidence} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 5. UPCOMING DEADLINES (if any)                                 */}
      {/* ============================================================== */}
      {brief.upcomingDeadlines.length > 0 && (
        <section id="section-upcoming-deadlines" style={sectionCard('#800000')}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div style={iconBox('#FAF3F3', '#F5E6E6', '#800000')}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
                    Upcoming Deadlines
                  </h2>
                  <span style={sectionBadge('#800000', '#FFFFFF', '#5C0000')}>
                    {brief.upcomingDeadlines.length} Upcoming
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  Future commitments due later in the historical simulation week
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {brief.upcomingDeadlines.map(action => (
              <ActionCard key={action.id} action={action} onViewEvidence={onViewEvidence} />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 6. RELEVANT MEETINGS                                           */}
      {/* ============================================================== */}
      <MeetingsSection meetings={brief.relevantMeetings} asOfDate={brief.asOfDate} />

      {/* ============================================================== */}
      {/* 7. ASK AGENT (Prominent interaction near bottom of dashboard)  */}
      {/* ============================================================== */}
      <AskAgent currentAsOf={brief.asOf} />

    </div>
  );
};

export default DailyBrief;
