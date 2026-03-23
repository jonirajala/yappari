import { useEffect, useRef, useState, type RefObject } from 'react';
import type { Lesson, LessonStatus, LessonResult } from '../../data/types';
import { LessonNode } from './LessonNode';

interface Props {
  lessons: Lesson[];
  unitColor: string;
  getLessonStatus: (lessonId: string) => LessonStatus;
  completedLessons: Record<string, LessonResult>;
  onLessonTap: (lessonId: string) => void;
  currentRef: RefObject<HTMLDivElement | null>;
}

const PATH_WIDTH = 320;
const CENTER_X = PATH_WIDTH / 2;
const AMPLITUDE = 80;
const VERTICAL_SPACING = 140;
const TOP_PADDING = 60;
const BOTTOM_PADDING = 60;
const FREQUENCY = Math.PI / 2.5;

function getNodePosition(index: number) {
  const x = CENTER_X + AMPLITUDE * Math.sin(index * FREQUENCY);
  const y = TOP_PADDING + index * VERTICAL_SPACING;
  return { x, y };
}

function generatePathD(positions: { x: number; y: number }[]): string {
  if (positions.length < 2) return '';
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 0; i < positions.length - 1; i++) {
    const curr = positions[i];
    const next = positions[i + 1];
    const midY = (curr.y + next.y) / 2;
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }
  return d;
}

export function WindingPath({
  lessons,
  unitColor,
  getLessonStatus,
  completedLessons,
  onLessonTap,
  currentRef,
}: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(0);

  const positions = lessons.map((_, i) => getNodePosition(i));
  const svgHeight = TOP_PADDING + (lessons.length - 1) * VERTICAL_SPACING + BOTTOM_PADDING;
  const pathD = generatePathD(positions);

  const completedCount = lessons.filter((l) => completedLessons[l.id]).length;
  // Color path up to and including the last completed node
  const completedRatio = lessons.length > 1 ? completedCount / (lessons.length - 1) : 0;
  const dashLength = totalLength * Math.min(completedRatio, 1);

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  return (
    <div className="relative mx-auto" style={{ width: PATH_WIDTH, height: svgHeight }}>
      {/* SVG path track */}
      <svg
        className="absolute inset-0"
        width={PATH_WIDTH}
        height={svgHeight}
        viewBox={`0 0 ${PATH_WIDTH} ${svgHeight}`}
      >
        {/* Background track (grey) */}
        <path
          d={pathD}
          fill="none"
          stroke="#E8E8E8"
          strokeWidth={8}
          strokeLinecap="round"
        />
        {/* Completed track (colored) */}
        {totalLength > 0 && dashLength > 0 && (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke={unitColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={`${dashLength} ${totalLength}`}
            strokeDashoffset={0}
            className="transition-all duration-700 ease-out"
          />
        )}
        {/* Hidden path for measuring */}
        {totalLength === 0 && (
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="transparent"
            strokeWidth={0}
          />
        )}
      </svg>

      {/* Lesson nodes */}
      {lessons.map((lesson, i) => {
        const pos = positions[i];
        const status = getLessonStatus(lesson.id);
        const isAvailable = status === 'available';

        return (
          <div
            key={lesson.id}
            ref={isAvailable ? currentRef : undefined}
            className="absolute"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <LessonNode
              lesson={lesson}
              status={status}
              unitColor={unitColor}
              index={i}
              result={completedLessons[lesson.id]}
              onTap={() => onLessonTap(lesson.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
