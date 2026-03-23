import type { Unit } from '../../data/types';

interface Props {
  unit: Unit;
  completedCount: number;
  isComingSoon?: boolean;
}

export function UnitHeader({ unit, completedCount, isComingSoon }: Props) {
  const unitNum = unit.id.split('-')[1];
  const totalLessons = unit.lessons.length;

  return (
    <div
      className={`rounded-2xl p-4 mx-4 ${isComingSoon ? 'opacity-50' : ''}`}
      style={{ backgroundColor: unit.color + '15' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: unit.color }}
        >
          {unitNum}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 truncate">{unit.title}</h3>
          <p className="text-xs text-gray-500 font-jp">{unit.titleJp}</p>
        </div>
        {!isComingSoon && totalLessons > 0 && (
          <div className="text-xs text-gray-400 font-medium shrink-0">
            {completedCount}/{totalLessons}
          </div>
        )}
        {isComingSoon && (
          <span className="text-xs text-gray-400">Coming soon</span>
        )}
      </div>
      {!isComingSoon && totalLessons > 0 && (
        <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(completedCount / totalLessons) * 100}%`,
              backgroundColor: unit.color,
            }}
          />
        </div>
      )}
    </div>
  );
}
