import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { journey, getJourneySequence } from '../data/course';
import { useProgressStore } from '../store/useProgressStore';
import { useUserStore } from '../store/useUserStore';
import type { LessonStatus } from '../data/types';
import { UnitHeader } from '../components/journey/UnitHeader';
import { WindingPath } from '../components/journey/WindingPath';
import { MilestoneNode } from '../components/journey/MilestoneNode';
import { LogoMark } from '../components/common/Logo';

export function JourneyPage() {
  const navigate = useNavigate();
  const { completedLessons, totalXp } = useProgressStore();
  const name = useUserStore((s) => s.name);
  const currentRef = useRef<HTMLDivElement>(null);

  const journeySeq = getJourneySequence();

  // Find the next available item (lesson or milestone) for the continue button
  const nextPlayableId = journeySeq.find((item) => {
    const idx = journeySeq.indexOf(item);
    if (completedLessons[item.id]) return false;
    if (idx === 0) return true;
    return !!completedLessons[journeySeq[idx - 1].id];
  })?.id ?? null;

  function getItemStatus(itemId: string): LessonStatus {
    if (completedLessons[itemId]) return 'completed';
    const idx = journeySeq.findIndex((item) => item.id === itemId);
    if (idx === 0) return 'available';
    const prevItem = journeySeq[idx - 1];
    if (prevItem && completedLessons[prevItem.id]) return 'available';
    return 'locked';
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-dvh bg-surface pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={52} />
            <div>
              <span className="text-xs text-gray-400">Welcome back,</span>
              <h1 className="text-base font-bold text-gray-800 -mt-0.5">{name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-accent-orange/10 px-3 py-1.5 rounded-full">
              <span className="text-accent-orange font-bold text-sm">{totalXp}</span>
              <span className="text-accent-orange text-xs">XP</span>
            </div>
            <Link
              to="/settings"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Journey */}
      <div className="max-w-lg mx-auto pt-4">
        {journey.map((item) => {
          if (item.type === 'unit') {
            const unit = item.unit;
            const completedCount = unit.lessons.filter(
              (l) => completedLessons[l.id]
            ).length;
            const isComingSoon = unit.lessons.length === 0;

            return (
              <div key={unit.id} className="mb-4">
                <UnitHeader
                  unit={unit}
                  completedCount={completedCount}
                  isComingSoon={isComingSoon}
                />

                {!isComingSoon && (
                  <WindingPath
                    lessons={unit.lessons}
                    unitColor={unit.color}
                    getLessonStatus={getItemStatus}
                    completedLessons={completedLessons}
                    onLessonTap={(id) => navigate(`/lesson/${id}`)}
                    currentRef={currentRef}
                  />
                )}
              </div>
            );
          } else {
            const ms = item.milestone;
            const status = getItemStatus(ms.id);
            const isAvailable = status === 'available';

            return (
              <div
                key={ms.id}
                ref={isAvailable ? currentRef : undefined}
                className="flex justify-center"
              >
                <MilestoneNode
                  milestone={ms}
                  status={status}
                  result={completedLessons[ms.id]}
                  onTap={() => navigate(`/lesson/${ms.id}`)}
                />
              </div>
            );
          }
        })}
      </div>

      {/* Floating continue button */}
      {nextPlayableId && (
        <div className="fixed bottom-0 left-0 right-0 z-10 p-4 pb-6 bg-gradient-to-t from-surface via-surface to-transparent">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => navigate(`/lesson/${nextPlayableId}`)}
              className="w-full btn-primary text-center"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
