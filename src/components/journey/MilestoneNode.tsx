import { motion } from 'framer-motion';
import type { MilestoneReview, LessonStatus, LessonResult } from '../../data/types';

interface Props {
  milestone: MilestoneReview;
  status: LessonStatus;
  result?: LessonResult;
  onTap: () => void;
}

export function MilestoneNode({ milestone, status, result, onTap }: Props) {
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';
  const isLocked = status === 'locked';

  return (
    <div className="flex flex-col items-center py-6">
      {/* Separator line */}
      <div className="w-48 h-px bg-amber-300/50 mb-4" />
      <p className="text-xs text-amber-500/70 font-medium uppercase tracking-wider mb-3">
        Checkpoint
      </p>

      <motion.button
        whileTap={!isLocked ? { scale: 0.93 } : undefined}
        onClick={() => { if (!isLocked) onTap(); }}
        disabled={isLocked}
        style={{
          width: 120,
          height: 120,
          ...(
            !isLocked
              ? { backgroundColor: '#F59E0B', boxShadow: '0 6px 0 0 #B45309' }
              : { boxShadow: '0 6px 0 0 #b0b0b0' }
          ),
        }}
        className={`
          relative rounded-3xl flex flex-col items-center justify-center
          font-bold transition-all overflow-visible
          ${isCompleted ? 'text-white'
            : isAvailable ? 'text-white scale-105'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        {/* Pulse ring for available state */}
        {isAvailable && (
          <div
            className="absolute inset-0 rounded-3xl animate-pulse-ring"
            style={{
              backgroundColor: '#F59E0B25',
              margin: -10,
            }}
          />
        )}

        {isCompleted ? (
          <>
            <span className="text-3xl mb-1">🏆</span>
            <span className="text-xs font-semibold leading-snug text-center px-2">
              {result?.stars ?? 0} ★
            </span>
          </>
        ) : isAvailable ? (
          <>
            <span className="text-3xl mb-1 animate-pulse">🏆</span>
            <span className="text-[11px] font-semibold leading-snug text-center px-2">
              Checkpoint
            </span>
          </>
        ) : (
          <>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="mb-1 opacity-50">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-[11px] font-medium leading-snug text-center px-2 opacity-60">
              Checkpoint
            </span>
          </>
        )}
      </motion.button>

      <p className={`mt-2 text-sm font-bold text-center ${isLocked ? 'text-gray-300' : 'text-amber-600'}`}>
        {milestone.title}
      </p>
      <p className={`text-xs text-center mt-1 ${isLocked ? 'text-gray-300' : 'text-amber-500/60'}`}>
        Score 70% to unlock next unit
      </p>
      <div className="w-48 h-px bg-amber-300/50 mt-4" />
    </div>
  );
}
