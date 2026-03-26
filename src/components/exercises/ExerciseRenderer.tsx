import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '../../data/types';
import { MultipleChoice } from './MultipleChoice';
import { FillBlank } from './FillBlank';
import { WordOrder } from './WordOrder';
import { Translation } from './Translation';
import { Matching } from './Matching';
import { GrammarIntro } from './GrammarIntro';
import { VocabIntro } from './VocabIntro';
import { KanaBuild } from './KanaBuild';
import { Listening } from './Listening';
import { TrueFalse } from './TrueFalse';
import { DialogueResponse } from './DialogueResponse';
import { KanjiReading } from './KanjiReading';
import { Reading } from './Reading';

interface Props {
  exercise: Exercise;
  onAnswer: (correct: boolean) => void;
}

export function ExerciseRenderer({ exercise, onAnswer }: Props) {
  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice exercise={exercise} onAnswer={onAnswer} />;
      case 'fill_blank':
        return <FillBlank exercise={exercise} onAnswer={onAnswer} />;
      case 'word_order':
        return <WordOrder exercise={exercise} onAnswer={onAnswer} />;
      case 'translation':
        return <Translation exercise={exercise} onAnswer={onAnswer} />;
      case 'matching':
        return <Matching exercise={exercise} onAnswer={onAnswer} />;
      case 'grammar_intro':
        return <GrammarIntro exercise={exercise} onAnswer={onAnswer} />;
      case 'vocab_intro':
        return <VocabIntro exercise={exercise} onAnswer={onAnswer} />;
      case 'kana_build':
        return <KanaBuild exercise={exercise} onAnswer={onAnswer} />;
      case 'listening':
        return <Listening exercise={exercise} onAnswer={onAnswer} />;
      case 'true_false':
        return <TrueFalse exercise={exercise} onAnswer={onAnswer} />;
      case 'dialogue_response':
        return <DialogueResponse exercise={exercise} onAnswer={onAnswer} />;
      case 'kanji_reading':
        return <KanjiReading exercise={exercise} onAnswer={onAnswer} />;
      case 'reading':
        return <Reading exercise={exercise} onAnswer={onAnswer} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={exercise.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        {renderExercise()}
      </motion.div>
    </AnimatePresence>
  );
}
