import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { Header } from './components/Header';
import { TimeSelector } from './components/TimeSelector';
import { SummaryCards } from './components/SummaryCards';
import { DailyBrief } from './components/DailyBrief';
import { AskAgent } from './components/AskAgent';
import { EvidenceModal } from './components/EvidenceModal';
import { fetchBrief, fetchHealth, triggerPipeline } from './services/api';
import { ExecutiveBrief, SystemHealth, ActionItem } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brief' | 'qa'>('brief');
  const [asOf, setAsOf] = useState<string>('2026-09-23T09:00:00');
  const [brief, setBrief] = useState<ExecutiveBrief | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState<boolean>(false);
  const [rebuildingPipeline, setRebuildingPipeline] = useState<boolean>(false);

  useEffect(() => {
    fetchHealth()
      .then(h => setHealth(h))
      .catch(err => console.warn('Health check error:', err));
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchBrief(asOf)
      .then(data => {
        if (isMounted) {
          setBrief(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error('Failed to load brief:', err);
          setError(err.message || 'Failed to connect to backend service.');
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [asOf]);

  const handleOpenEvidence = (action: ActionItem) => {
    setSelectedAction(action);
    setEvidenceModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    setActiveTab('brief');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleRebuildPipeline = async () => {
    setRebuildingPipeline(true);
    try {
      await triggerPipeline();
      const updatedBrief = await fetchBrief(asOf);
      setBrief(updatedBrief);
    } catch (err: any) {
      alert(`Pipeline rebuild failed: ${err.message}`);
    } finally {
      setRebuildingPipeline(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#E5E7EB', color: '#111827', fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      <Header health={health} activeTab={activeTab} setActiveTab={setActiveTab} asOf={asOf} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {brief && (
          <TimeSelector
            timepoints={brief.timepoints}
            currentAsOf={asOf}
            onSelectTime={newTime => setAsOf(newTime)}
          />
        )}

        {loading && !brief ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#800000' }} />
            <p className="text-xs font-semibold" style={{ color: '#6B7280' }}>
              Evaluating Historical State as of {asOf}...
            </p>
          </div>
        ) : error ? (
          <div
            className="p-6 rounded-xl border text-center space-y-3"
            style={{ backgroundColor: '#FFF1F2', borderColor: '#FCA5A5', color: '#B91C1C' }}
          >
            <p className="font-bold text-sm">Backend Connection Error</p>
            <p className="text-xs" style={{ color: '#EF4444' }}>{error}</p>
            <button
              onClick={() => setAsOf('2026-09-23T09:00:00')}
              className="px-4 py-2 rounded-lg text-white text-xs font-medium transition-colors cursor-pointer"
              style={{ backgroundColor: '#800000' }}
            >
              Reset to Default Time
            </button>
          </div>
        ) : brief ? (
          <>
            <SummaryCards metrics={brief.metrics} onFilterClick={handleScrollToSection} />
            {activeTab === 'brief' ? (
              <DailyBrief brief={brief} onViewEvidence={handleOpenEvidence} />
            ) : (
              <AskAgent currentAsOf={asOf} />
            )}
          </>
        ) : null}
      </main>

      <EvidenceModal
        action={selectedAction}
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
      />

      <footer
        className="mt-12 py-5 text-xs"
        style={{ borderTop: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', color: '#6B7280' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#800000' }} />
            <span className="font-semibold" style={{ color: '#374151' }}>
              AIONOS Executive Productivity Agent • Built for Arjun Malhotra (VP Sales)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRebuildPipeline}
              disabled={rebuildingPipeline}
              className="flex items-center gap-1.5 text-xs transition-colors cursor-pointer font-medium"
              style={{ color: rebuildingPipeline ? '#800000' : '#6B7280' }}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${rebuildingPipeline ? 'animate-spin' : ''}`} />
              <span>Re-run Pipeline</span>
            </button>
            <span style={{ color: '#D1D5DB' }}>•</span>
            <span>Historical Exercise: Sep 21–25, 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
