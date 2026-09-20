import React, { useState } from 'react';
import { Sparkles, Send, Loader2, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { QAResponse, EvidenceItem } from '../types';
import { askAgent } from '../services/api';

interface AskAgentProps {
  currentAsOf: string;
  onViewEvidenceItem?: (evidence: EvidenceItem) => void;
}

export const AskAgent: React.FC<AskAgentProps> = ({ currentAsOf }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QAResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const suggestedQuestions = [
    { label: 'Vendor List Promise', q: 'What did I promise Raghav?' },
    { label: "Today's Action Items", q: 'What needs action today?' },
    { label: 'Waiting on Others', q: 'What am I waiting on?' },
    { label: 'Mumbai Lease Status', q: "What's happening with the Mumbai lease?" },
    { label: 'Campaign Deck Deadline', q: 'When is the Q3 campaign deck due?' },
    { label: 'Deck Deadline Shift', q: 'Did the campaign deck deadline change?' },
    { label: 'Expense Variance Report', q: 'What happened with the expense variance report?' },
    { label: 'Meridian Logistics Call', q: "What's happening with the Meridian call?" }
  ];

  const handleAsk = async (queryToAsk: string) => {
    if (!queryToAsk.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await askAgent(queryToAsk, currentAsOf);
      setResponse(res);
    } catch (err: any) {
      setError(err.message || 'Failed to obtain answer from agent.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(question);
  };

  return (
    <div id="section-ask-agent" className="space-y-5" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* Query Card */}
      <div
        className="p-5 sm:p-6 rounded-xl"
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-2 rounded-lg shrink-0"
            style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight" style={{ color: '#111827' }}>
              Ask Executive Productivity Agent
            </h2>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              Grounded executive Q&A for Arjun Malhotra • Evaluated strictly as of the simulated historical time
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              id="qa-input-field"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="Ask anything about Arjun's commitments, deadlines, or deliverables..."
              className="w-full rounded-lg px-4 py-2.5 text-sm transition-all"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                color: '#111827',
                fontFamily: 'Arial, Helvetica, sans-serif',
                outline: 'none',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#800000';
                e.target.style.boxShadow = '0 0 0 2px rgba(128, 0, 0, 0.2)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#D1D5DB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            type="submit"
            id="qa-submit-button"
            disabled={loading || !question.trim()}
            className="px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer"
            style={{
              backgroundColor: loading || !question.trim() ? '#E5E7EB' : '#800000',
              color: loading || !question.trim() ? '#9CA3AF' : '#FFFFFF',
              border: '1px solid',
              borderColor: loading || !question.trim() ? '#D1D5DB' : '#5C0000',
              cursor: loading || !question.trim() ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => {
              if (!loading && question.trim()) {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#5C0000';
              }
            }}
            onMouseLeave={e => {
              if (!loading && question.trim()) {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#800000';
              }
            }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Ask</span>
          </button>
        </form>

        {/* Suggested Chips */}
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #E5E7EB' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: '#6B7280' }}>
            Suggested Prompts:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setQuestion(item.q); handleAsk(item.q); }}
                className="text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium"
                style={{
                  backgroundColor: '#FAF3F3',
                  color: '#800000',
                  border: '1px solid #F5E6E6',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#800000';
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.borderColor = '#5C0000';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF3F3';
                  (e.currentTarget as HTMLElement).style.color = '#800000';
                  (e.currentTarget as HTMLElement).style.borderColor = '#F5E6E6';
                }}
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          className="p-8 rounded-xl text-center space-y-2.5"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}
        >
          <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: '#800000' }} />
          <div className="text-sm font-bold" style={{ color: '#111827' }}>
            Synthesizing Grounded Answer via LangChain...
          </div>
          <p className="text-xs max-w-md mx-auto" style={{ color: '#6B7280' }}>
            Cross-referencing Leadership Sync, email threads, calendar events, and voice notes as of {currentAsOf}
          </p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          className="p-4 rounded-lg text-xs"
          style={{ backgroundColor: '#FFF1F2', border: '1px solid #FCA5A5', color: '#DC2626' }}
        >
          {error}
        </div>
      )}

      {/* Answer */}
      {response && (
        <div
          className="p-6 rounded-xl space-y-4"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderTop: '3px solid #800000',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3"
            style={{ borderBottom: '1px solid #E5E7EB' }}>
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                style={{ backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000' }}
              >
                Agent Response
              </span>
              <h3 className="text-base font-bold mt-1" style={{ color: '#111827' }}>
                "{response.question}"
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {response.status && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md uppercase"
                  style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}>
                  Status: {response.status}
                </span>
              )}
              {response.deadline && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1"
                  style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}>
                  <Clock className="w-3 h-3" style={{ color: '#800000' }} />
                  <span>{response.deadline}</span>
                </span>
              )}
            </div>
          </div>

          {/* Executive Summary */}
          <div
            className="p-4 rounded-lg text-sm leading-relaxed font-medium"
            style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#111827' }}
          >
            {response.summary}
          </div>

          {/* Key Takeaways */}
          {response.keyPoints && response.keyPoints.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                style={{ color: '#6B7280' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#800000' }} />
                <span>Key Executive Takeaways</span>
              </h4>
              <ul className="space-y-1.5">
                {response.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: '#374151' }}>
                    <span style={{ color: '#800000', fontWeight: '700', flexShrink: 0 }}>•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Evidence Citations */}
          {response.citations && response.citations.length > 0 && (
            <div className="pt-3" style={{ borderTop: '1px solid #E5E7EB' }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
                style={{ color: '#6B7280' }}>
                <ShieldCheck className="w-4 h-4" style={{ color: '#800000' }} />
                <span>Direct Data Pack Citations ({response.citations.length})</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {response.citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg text-xs space-y-1.5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold capitalize" style={{ color: '#111827' }}>
                        {cite.sourceType.replace('_', ' ')}
                      </span>
                      <span style={{ color: '#6B7280' }}>{cite.displayTime}</span>
                    </div>
                    <div className="text-[11px] flex items-center gap-1" style={{ color: '#6B7280' }}>
                      <span className="font-semibold" style={{ color: '#374151' }}>{cite.from}</span>
                      {cite.to && (
                        <>
                          <ArrowRight className="w-2.5 h-2.5" style={{ color: '#800000' }} />
                          <span>{cite.to}</span>
                        </>
                      )}
                    </div>
                    <div
                      className="p-2 rounded font-mono text-[11px] italic"
                      style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#374151' }}
                    >
                      "{cite.evidence}"
                    </div>
                    {cite.note && (
                      <div className="text-[10px] font-semibold" style={{ color: '#800000' }}>
                        Note: {cite.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AskAgent;
