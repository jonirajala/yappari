import { create } from 'zustand';
import type { Exercise } from '../data/types';

interface AnswerRecord {
  exerciseId: string;
  wasCorrect: boolean;
}

interface SessionState {
  lessonId: string | null;
  exercises: Exercise[];
  currentIndex: number;
  answers: AnswerRecord[];
  mistakes: number;
  startLesson: (lessonId: string, exercises: Exercise[]) => void;
  submitAnswer: (exerciseId: string, wasCorrect: boolean) => void;
  nextExercise: () => void;
  getCurrentExercise: () => Exercise | null;
  isComplete: () => boolean;
  getScore: () => number;
  getStars: () => number;
  reset: () => void;
}

export const useSessionStore = create<SessionState>()((set, get) => ({
  lessonId: null,
  exercises: [],
  currentIndex: 0,
  answers: [],
  mistakes: 0,

  startLesson: (lessonId, exercises) =>
    set({ lessonId, exercises, currentIndex: 0, answers: [], mistakes: 0 }),

  submitAnswer: (exerciseId, wasCorrect) =>
    set((state) => ({
      answers: [...state.answers, { exerciseId, wasCorrect }],
      mistakes: wasCorrect ? state.mistakes : state.mistakes + 1,
    })),

  nextExercise: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  getCurrentExercise: () => {
    const { exercises, currentIndex } = get();
    return exercises[currentIndex] ?? null;
  },

  isComplete: () => {
    const { exercises, currentIndex } = get();
    return currentIndex >= exercises.length;
  },

  getScore: () => {
    const { answers } = get();
    const scored = answers.filter((a) => a.wasCorrect !== undefined);
    if (scored.length === 0) return 100;
    const correct = scored.filter((a) => a.wasCorrect).length;
    return Math.round((correct / scored.length) * 100);
  },

  getStars: () => {
    const score = get().getScore();
    if (score >= 95) return 3;
    if (score >= 75) return 2;
    return 1;
  },

  reset: () =>
    set({ lessonId: null, exercises: [], currentIndex: 0, answers: [], mistakes: 0 }),
}));
