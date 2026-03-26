// === Course Structure ===

export interface Course {
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  titleJp?: string;
  vocabulary: VocabWord[];
  exercises: Exercise[];
}

export interface VocabWord {
  japanese: string;
  reading: string;
  english: string;
  emoji?: string;
}

// === Exercise Types ===

export type Exercise =
  | MultipleChoiceExercise
  | MatchingExercise
  | FillBlankExercise
  | WordOrderExercise
  | KanaBuildExercise
  | TranslationExercise
  | GrammarIntroExercise
  | VocabIntroExercise
  | ListeningExercise
  | TrueFalseExercise
  | DialogueResponseExercise
  | KanjiReadingExercise
  | ReadingExercise;

export type ExerciseType =
  | 'multiple_choice'
  | 'matching'
  | 'fill_blank'
  | 'word_order'
  | 'kana_build'
  | 'translation'
  | 'grammar_intro'
  | 'vocab_intro'
  | 'listening'
  | 'true_false'
  | 'dialogue_response'
  | 'kanji_reading'
  | 'reading';

interface ExerciseBase {
  id: string;
  type: ExerciseType;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple_choice';
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface MatchingExercise extends ExerciseBase {
  type: 'matching';
  pairs: { left: string; right: string }[];
}

export interface FillBlankExercise extends ExerciseBase {
  type: 'fill_blank';
  sentence: string; // Use ＿ for blank
  answer: string;
  options: string[];
  /** English translation of the complete sentence, shown after checking */
  translation?: string;
}

export interface WordOrderExercise extends ExerciseBase {
  type: 'word_order';
  prompt: string;
  correctOrder: string[];
  distractors?: string[];
}

export interface TranslationExercise extends ExerciseBase {
  type: 'translation';
  prompt: string;
  correctAnswer: string[];
  wordBank: string[];
}

export interface KanaBuildExercise extends ExerciseBase {
  type: 'kana_build';
  /** English prompt shown to the user */
  prompt: string;
  /** The correct characters in order */
  correctChars: string[];
  /** Extra distractor characters mixed into the bank */
  distractors: string[];
  /** Optional emoji hint */
  emoji?: string;
}

export interface GrammarIntroExercise extends ExerciseBase {
  type: 'grammar_intro';
  title: string;
  explanation: string;
  examples: { japanese: string; english: string }[];
}

export interface VocabIntroExercise extends ExerciseBase {
  type: 'vocab_intro';
  words: { japanese: string; reading: string; english: string; emoji?: string }[];
}

export interface ListeningExercise extends ExerciseBase {
  type: 'listening';
  /** Japanese text to speak via TTS */
  audio: string;
  options: string[];
  correctIndex: number;
}

export interface TrueFalseExercise extends ExerciseBase {
  type: 'true_false';
  japanese: string;
  english: string;
  isCorrect: boolean;
  /** Shown when isCorrect=false and learner answers correctly */
  correctEnglish?: string;
}

export interface ReadingExercise extends ExerciseBase {
  type: 'reading';
  passage: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface KanjiReadingExercise extends ExerciseBase {
  type: 'kanji_reading';
  kanji: string;
  correctReading: string;
  options: string[];
  english?: string;
}

export interface DialogueResponseExercise extends ExerciseBase {
  type: 'dialogue_response';
  speaker: string;
  speakerLine: string;
  prompt?: string;
  options: string[];
  correctIndex: number;
}

// === Milestone Reviews ===

export interface MilestoneReview {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  afterUnitId: string;
  exercises: Exercise[];
}

export type JourneyItem =
  | { type: 'unit'; unit: Unit }
  | { type: 'milestone'; milestone: MilestoneReview };

// === Progress ===

export interface LessonResult {
  lessonId: string;
  completedAt: string;
  score: number;
  stars: number;
  mistakes: number;
}

export type LessonStatus = 'locked' | 'available' | 'completed';
