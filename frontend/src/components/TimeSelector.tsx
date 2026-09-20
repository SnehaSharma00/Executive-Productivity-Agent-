import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Timepoint } from '../types';

interface TimeSelectorProps {
  timepoints: Timepoint[];
  currentAsOf: string;
  onSelectTime: (iso: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({ timepoints, currentAsOf, onSelectTime }) => {
  const currentIndex = timepoints.findIndex(t => t.iso === currentAsOf);

  const handlePrev = () => { if (currentIndex > 0) onSelectTime(timepoints[currentIndex - 1].iso); };
  const handleNext = () => { if (currentIndex < timepoints.length - 1) onSelectTime(timepoints[currentIndex + 1].iso); };

  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Label */}
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg shrink-0"
            style={{ backgroundColor: '#FAF3F3', border: '1px solid #F5E6E6', color: '#800000' }}
          >
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>
                Simulated Timeline
              </span>
              <span style={{ color: '#D1D5DB' }}>•</span>
              <span className="text-[11px]" style={{ color: '#6B7280' }}>
                (Sep 21–25, 2026)
              </span>
            </div>
            <div className="text-sm font-bold flex items-center gap-2 mt-0.5" style={{ color: '#111827' }}>
              <span>Viewing as of:</span>
              <span
                className="px-2.5 py-0.5 rounded-md font-bold text-xs"
                style={{ color: '#FFFFFF', backgroundColor: '#800000', border: '1px solid #5C0000' }}
              >
                {timepoints.find(t => t.iso === currentAsOf)?.label || currentAsOf}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            title="Step Back in Time"
            className="p-1.5 rounded-md transition-all cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              color: '#800000',
              opacity: currentIndex <= 0 ? 0.35 : 1,
              cursor: currentIndex <= 0 ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => {
              if (currentIndex > 0) {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#800000';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.borderColor = '#5C0000';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
              (e.currentTarget as HTMLElement).style.color = '#800000';
              (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="relative">
            <select
              id="time-selector-dropdown"
              value={currentAsOf}
              onChange={e => onSelectTime(e.target.value)}
              className="appearance-none text-xs font-semibold rounded-md pl-3 pr-8 py-1.5 cursor-pointer transition-colors"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D1D5DB',
                color: '#111827',
                fontFamily: 'Arial, Helvetica, sans-serif',
                outline: 'none',
              }}
            >
              {timepoints.map(tp => (
                <option key={tp.id} value={tp.iso}>{tp.label}</option>
              ))}
            </select>
            <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#800000' }} />
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= timepoints.length - 1}
            title="Step Forward in Time"
            className="p-1.5 rounded-md transition-all cursor-pointer"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              color: '#800000',
              opacity: currentIndex >= timepoints.length - 1 ? 0.35 : 1,
              cursor: currentIndex >= timepoints.length - 1 ? 'not-allowed' : 'pointer',
            }}
            onMouseEnter={e => {
              if (currentIndex < timepoints.length - 1) {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#800000';
                (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.borderColor = '#5C0000';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
              (e.currentTarget as HTMLElement).style.color = '#800000';
              (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Time pills */}
      <div
        className="mt-3 pt-3 flex items-center gap-1.5 overflow-x-auto pb-1"
        style={{ borderTop: '1px solid #E5E7EB' }}
      >
        {timepoints.map(tp => {
          const isSelected = tp.iso === currentAsOf;
          return (
            <button
              key={tp.id}
              onClick={() => onSelectTime(tp.iso)}
              className="whitespace-nowrap px-2.5 py-1 rounded-md text-xs transition-all cursor-pointer"
              style={{
                backgroundColor: isSelected ? '#800000' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#374151',
                border: isSelected ? '1px solid #5C0000' : '1px solid #E5E7EB',
                fontWeight: isSelected ? '700' : '500',
                fontFamily: 'Arial, Helvetica, sans-serif',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF3F3';
                  (e.currentTarget as HTMLElement).style.color = '#800000';
                  (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.color = '#374151';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
                }
              }}
            >
              {tp.label.replace(' — ', ' ')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
