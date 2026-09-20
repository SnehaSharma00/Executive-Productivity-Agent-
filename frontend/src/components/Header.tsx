import React from 'react';
import { UserCheck, Sparkles, ShieldCheck, MessageSquare, LayoutDashboard } from 'lucide-react';
import { SystemHealth } from '../types';

interface HeaderProps {
  health: SystemHealth | null;
  activeTab: 'brief' | 'qa';
  setActiveTab: (tab: 'brief' | 'qa') => void;
  asOf: string;
}

export const Header: React.FC<HeaderProps> = ({ health, activeTab, setActiveTab }) => {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '3px solid #800000',
        borderBottom: '1px solid #E5E7EB',
        fontFamily: 'Arial, Helvetica, sans-serif',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* Executive Identity */}
          <div className="flex items-center space-x-3.5">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}
            >
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-bold tracking-tight" style={{ color: '#111827' }}>
                  Arjun Malhotra
                </h1>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md tracking-wide"
                  style={{ backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000' }}
                >
                  VP Sales
                </span>
                <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Veridian Corp</span>
              </div>
              <p className="text-xs flex items-center gap-1.5 mt-0.5 flex-wrap" style={{ color: '#6B7280' }}>
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" style={{ color: '#800000' }} />
                <span className="font-semibold" style={{ color: '#374151' }}>Executive Productivity Agent</span>
                <span style={{ color: '#D1D5DB' }}>•</span>
                <span>Historical Simulation (Sep 21–25, 2026)</span>
              </p>
            </div>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center gap-3">
            {/* AI Engine Status Badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
              style={{
                backgroundColor: '#FAF3F3',
                border: '1px solid #E5E7EB',
                color: '#374151',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#800000' }} />
              <span className="font-bold" style={{ color: '#800000' }}>LangChain</span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span>{health?.geminiConfigured ? 'Gemini 3.8 Flash' : 'Deterministic Grounding'}</span>
              <span
                className="w-2 h-2 rounded-full pulse-status"
                style={{ backgroundColor: health?.geminiConfigured ? '#800000' : '#F59E0B' }}
              />
            </div>

            {/* Navigation Tabs */}
            <div
              className="flex p-1 rounded-lg"
              style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB' }}
            >
              <button
                id="tab-brief"
                onClick={() => setActiveTab('brief')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer"
                style={
                  activeTab === 'brief'
                    ? { backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000', fontWeight: '700' }
                    : { color: '#6B7280', border: '1px solid transparent', fontWeight: '500' }
                }
              >
                <LayoutDashboard className="w-3.5 h-3.5" style={{ color: activeTab === 'brief' ? '#FFFFFF' : '#6B7280' }} />
                <span>Executive Brief</span>
              </button>
              <button
                id="tab-qa"
                onClick={() => setActiveTab('qa')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer"
                style={
                  activeTab === 'qa'
                    ? { backgroundColor: '#800000', color: '#FFFFFF', border: '1px solid #5C0000', fontWeight: '700' }
                    : { color: '#6B7280', border: '1px solid transparent', fontWeight: '500' }
                }
              >
                <MessageSquare className="w-3.5 h-3.5" style={{ color: activeTab === 'qa' ? '#FFFFFF' : '#6B7280' }} />
                <span>Ask Agent</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
