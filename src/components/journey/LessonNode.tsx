import { motion } from 'framer-motion';
import type { Lesson, LessonStatus, LessonResult } from '../../data/types';

interface Props {
  lesson: Lesson;
  status: LessonStatus;
  unitColor: string;
  result?: LessonResult;
  onTap: () => void;
  index: number;
}

function darkenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
  const b = Math.max(0, (num & 0x0000ff) - amount);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

export function LessonNode({ lesson, status, unitColor, result, onTap }: Props) {
  const isCompleted = status === 'completed';
  const isAvailable = status === 'available';
  const isLocked = status === 'locked';
  const shadowColor = darkenColor(unitColor, 40);

  return (
    <div className="flex flex-col items-center">
      {/* Pulse ring */}
      {isAvailable && (
        <div
          className="absolute rounded-full animate-pulse-ring"
          style={{
            width: 120,
            height: 120,
            backgroundColor: unitColor + '20',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      <motion.button
        whileTap={!isLocked ? { scale: 0.93 } : undefined}
        onClick={() => { if (!isLocked) onTap(); }}
        disabled={isLocked}
        style={{
          width: 100,
          height: 100,
          ...(
            !isLocked
              ? { backgroundColor: unitColor, boxShadow: `0 6px 0 0 ${shadowColor}` }
              : { boxShadow: '0 6px 0 0 #b0b0b0' }
          ),
        }}
        className={`
          relative rounded-full flex flex-col items-center justify-center
          font-bold transition-all overflow-visible
          ${isCompleted ? 'text-white'
            : isAvailable ? 'text-white scale-105'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
        `}
      >
        {isCompleted ? (
          <>
            <span className="text-sm leading-none mb-1">{'★'.repeat(result?.stars ?? 1)}</span>
            <span className="text-[13px] font-semibold leading-snug text-center">
              {lesson.title}
            </span>
          </>
        ) : isAvailable ? (
          <>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="mb-1">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
            <span className="text-[13px] font-semibold leading-snug text-center">
              {lesson.title}
            </span>
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="mb-1 opacity-50">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className="text-[12px] font-medium leading-snug text-center opacity-60">
              {lesson.title}
            </span>
          </>
        )}
      </motion.button>

      {isAvailable && (
        <div className="mt-2 animate-bounce">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-md"
            style={{ backgroundColor: unitColor }}
          >
            START
          </span>
        </div>
      )}
    </div>
  );
}
