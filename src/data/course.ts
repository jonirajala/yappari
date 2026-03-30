import type { Unit, JourneyItem, MilestoneReview } from './types.ts';
import { unit1Lessons } from './v2/unit1.ts';
import { unit2Lessons } from './v2/unit2.ts';
import { unit3Lessons } from './v2/unit3.ts';
import { unit4Lessons } from './v2/unit4.ts';
import { unit5Lessons } from './v2/unit5.ts';
import { unit6Lessons } from './v2/unit6.ts';
import { unit7Lessons } from './v2/unit7.ts';
import { unit8Lessons } from './v2/unit8.ts';
import { unit9Lessons } from './v2/unit9.ts';
import { unit10Lessons } from './v2/unit10.ts';
import { unit11Lessons } from './v2/unit11.ts';
import { unit12Lessons } from './v2/unit12.ts';
import { unit13Lessons } from './v2/unit13.ts';
import { unit14Lessons } from './v2/unit14.ts';
import { milestone1 } from './v2/milestone1.ts';
import { milestone2 } from './v2/milestone2.ts';
import { milestone3 } from './v2/milestone3.ts';
import { milestone4 } from './v2/milestone4.ts';

export const course: Unit[] = [
  {
    id: 'unit-1',
    title: 'Hello!',
    titleJp: 'こんにちは',
    description: 'Shortest, highest-confidence greetings only',
    color: '#D94F3B',
    lessons: unit1Lessons,
  },
  {
    id: 'unit-2',
    title: 'Please & Thank You',
    titleJp: 'おねがいします',
    description: 'Social survival with short useful phrases',
    color: '#3B82F6',
    lessons: unit2Lessons,
  },
  {
    id: 'unit-3',
    title: 'I Am...',
    titleJp: 'わたしは',
    description: 'は/です pattern, questions, negation, self-intro',
    color: '#E67E22',
    lessons: unit3Lessons,
  },
  {
    id: 'unit-4',
    title: 'What Is This?',
    titleJp: 'これはなに',
    description: 'これ/それ/あれ, identifying objects',
    color: '#8B5CF6',
    lessons: unit4Lessons,
  },
  {
    id: 'unit-5',
    title: 'My Things',
    titleJp: 'わたしのもの',
    description: 'この/その/あの, の possession, more objects',
    color: '#10B981',
    lessons: unit5Lessons,
  },
  {
    id: 'unit-6',
    title: 'Also & Where?',
    titleJp: 'もとどこ',
    description: 'も particle, location words, どれ/どの',
    color: '#D94F3B',
    lessons: unit6Lessons,
  },
  {
    id: 'unit-7',
    title: 'People & Family',
    titleJp: 'ひととかぞく',
    description: 'Family words, person words, personal-world vocabulary',
    color: '#3B82F6',
    lessons: unit7Lessons,
  },
  {
    id: 'unit-8',
    title: 'Numbers',
    titleJp: 'すうじ',
    description: '1-10, quantity, age, prices, first counting feel',
    color: '#E67E22',
    lessons: unit8Lessons,
  },
  {
    id: 'unit-9',
    title: 'Time & Days',
    titleJp: 'じかん',
    description: 'Days, time, daily rhythm, routine-ready vocabulary',
    color: '#8B5CF6',
    lessons: unit9Lessons,
  },
  {
    id: 'unit-10',
    title: 'Places',
    titleJp: 'ばしょ',
    description: 'School/home/station/store, existence, first go/come/location sentences',
    color: '#10B981',
    lessons: unit10Lessons,
  },
  {
    id: 'unit-11',
    title: 'Eating & Drinking',
    titleJp: 'たべものとのみもの',
    description: 'Food/drink vocab, を particle, たべます/のみます, meal phrases',
    color: '#D94F3B',
    lessons: unit11Lessons,
  },
  {
    id: 'unit-12',
    title: 'Daily Actions',
    titleJp: 'まいにちのこと',
    description: 'More verbs (みます, よみます, かきます, します), verb negative ～ません',
    color: '#3B82F6',
    lessons: unit12Lessons,
  },
  {
    id: 'unit-13',
    title: 'Describing Things',
    titleJp: 'せつめい',
    description: 'な-adjectives, い-adjective conjugation, すき/きらい',
    color: '#E67E22',
    lessons: unit13Lessons,
  },
  {
    id: 'unit-14',
    title: 'Home & School Life',
    titleJp: 'せいかつ',
    description: 'Rooms, frequency adverbs, verb past ～ました/～ませんでした, daily routines',
    color: '#8B5CF6',
    lessons: unit14Lessons,
  },
  {
    id: 'unit-15',
    title: 'Transport',
    titleJp: 'のりもの',
    description: 'Train, bus, car, bike, going places',
    color: '#10B981',
    lessons: [],
  },
  {
    id: 'unit-16',
    title: 'Directions',
    titleJp: 'みちあんない',
    description: 'Right, left, front, back, near, next to',
    color: '#D94F3B',
    lessons: [],
  },
  {
    id: 'unit-17',
    title: 'Shopping & Prices',
    titleJp: 'かいもの',
    description: '円, いくら, buying language',
    color: '#3B82F6',
    lessons: [],
  },
  {
    id: 'unit-18',
    title: 'Weather & Seasons',
    titleJp: 'てんきときせつ',
    description: 'Hot, cold, weather, seasons',
    color: '#E67E22',
    lessons: [],
  },
  {
    id: 'unit-19',
    title: 'Hobbies & Interests',
    titleJp: 'しゅみ',
    description: 'Movies, music, sports, activities',
    color: '#8B5CF6',
    lessons: [],
  },
  {
    id: 'unit-20',
    title: 'Body & Health',
    titleJp: 'からだとけんこう',
    description: 'Body parts, health, feeling well or unwell',
    color: '#10B981',
    lessons: [],
  },
  {
    id: 'unit-21',
    title: 'Colors & Appearance',
    titleJp: 'いろとみため',
    description: 'Colors, appearance, descriptive contrast',
    color: '#D94F3B',
    lessons: [],
  },
  {
    id: 'unit-22',
    title: 'Counters & Quantities',
    titleJp: 'かずとかぞえかた',
    description: '～つ, ～人, ～本, ～枚',
    color: '#3B82F6',
    lessons: [],
  },
  {
    id: 'unit-23',
    title: 'Invitations & Plans',
    titleJp: 'さそいとよてい',
    description: 'Invitations, suggestions, simple plans',
    color: '#E67E22',
    lessons: [],
  },
  {
    id: 'unit-24',
    title: 'Experiences & Preferences',
    titleJp: 'けいけんとこのみ',
    description: 'Likes, wants, experience, comparisons',
    color: '#8B5CF6',
    lessons: [],
  },
];

export const milestones: MilestoneReview[] = [milestone1, milestone2, milestone3, milestone4];

/** Journey sequence interleaving units and milestones */
export const journey: JourneyItem[] = buildJourney();

function buildJourney(): JourneyItem[] {
  const milestoneMap = new Map(milestones.map((m) => [m.afterUnitId, m]));
  const items: JourneyItem[] = [];
  for (const unit of course) {
    items.push({ type: 'unit', unit });
    const ms = milestoneMap.get(unit.id);
    if (ms) items.push({ type: 'milestone', milestone: ms });
  }
  return items;
}

/**
 * Flat ordered sequence of all playable IDs (lessons + milestones).
 * Used for gating logic and "next" navigation.
 */
const _journeySequence: { id: string; type: 'lesson' | 'milestone' }[] = (() => {
  const seq: { id: string; type: 'lesson' | 'milestone' }[] = [];
  for (const item of journey) {
    if (item.type === 'unit') {
      for (const lesson of item.unit.lessons) {
        seq.push({ id: lesson.id, type: 'lesson' });
      }
    } else {
      seq.push({ id: item.milestone.id, type: 'milestone' });
    }
  }
  return seq;
})();

export function getJourneySequence() {
  return _journeySequence;
}

export function getAllLessons() {
  return course.flatMap((unit) => unit.lessons);
}

export function getLessonById(lessonId: string) {
  return getAllLessons().find((l) => l.id === lessonId);
}

export function getMilestoneById(id: string): MilestoneReview | undefined {
  return milestones.find((m) => m.id === id);
}

export function getUnitByLessonId(lessonId: string) {
  return course.find((u) => u.lessons.some((l) => l.id === lessonId));
}

export function getNextLessonId(currentLessonId: string): string | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx >= allLessons.length - 1) return null;
  return allLessons[idx + 1].id;
}

export function getPreviousLessonId(currentLessonId: string): string | null {
  const allLessons = getAllLessons();
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  if (idx <= 0) return null;
  return allLessons[idx - 1].id;
}

export function isMilestoneId(id: string): boolean {
  return milestones.some((m) => m.id === id);
}
