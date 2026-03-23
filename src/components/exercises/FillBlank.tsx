import { useState } from 'react';
import type { FillBlankExercise } from '../../data/types';
import { cn, shuffleArray } from '../../lib/utils';
import { JpText } from '../common/JpText';
import { getReading } from '../../data/readings';
import { speakJapanese } from '../../lib/speech';
import { playTap, playCorrect, playIncorrect } from '../../lib/sounds';

interface Props {
  exercise: FillBlankExercise;
  onAnswer: (correct: boolean) => void;
}

export function FillBlank({ exercise, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [shuffledOptions] = useState(() => shuffleArray(exercise.options));

  const handleSelect = (option: string) => {
    if (answered) return;
    playTap();
    setSelected(option === selected ? null : option);
    if (getReading(option)) speakJapanese(option);
  };

  const handleCheck = () => {
    if (selected === null) return;
    setAnswered(true);
    const isCorrect = selected === exercise.answer;
    if (isCorrect) {
      playCorrect();
      // Speak the full sentence on correct — user heard the word but not the sentence
      const completeSentence = exercise.sentence.replace('＿', exercise.answer);
      setTimeout(() => speakJapanese(completeSentence), 300);
    } else {
      playIncorrect();
    }
    setTimeout(() => onAnswer(isCorrect), 1000);
  };

  // Split sentence by ＿
  const parts = exercise.sentence.split('＿');

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-4">
        <h2 className="text-lg font-bold text-gray-800 text-center mb-2">
          Fill in the blank
        </h2>

        {/* Sentence with blank */}
        <div className="font-jp text-2xl text-center mb-10 flex items-center justify-center flex-wrap gap-1">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center gap-1">
              <span>{part}</span>
              {i < parts.length - 1 && (
                <span
                  className={cn(
                    'inline-flex items-center justify-center min-w-16 px-3 py-1 rounded-xl border-2 border-dashed transition-all',
                    selected
                      ? answered
                        ? selected === exercise.answer
                          ? 'border-correct bg-correct/10 text-correct'
                          : 'border-incorrect bg-incorrect/10 text-incorrect animate-shake'
                        : 'border-accent-blue bg-accent-blue/5 text-accent-blue'
                      : 'border-gray-300 text-gray-300'
                  )}
                >
                  {selected || '?'}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Translation after answer */}
        {answered && (
          <p className={cn(
            'text-center text-sm mb-6 font-medium',
            selected === exercise.answer ? 'text-correct' : 'text-incorrect'
          )}>
            {exercise.translation
              ? `"${exercise.translation}"`
              : `Correct answer: ${exercise.answer}`
            }
            {answered && selected !== exercise.answer && (
              <span className="block font-jp text-correct mt-1">
                {exercise.sentence.replace('＿', exercise.answer)}
              </span>
            )}
          </p>
        )}

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-3 max-w-md mx-auto">
          {shuffledOptions.map((option) => {
            const isSelected = option === selected;
            const isCorrectAnswer = option === exercise.answer;

            let style = 'border-gray-200 bg-white text-gray-800';
            if (answered && isCorrectAnswer) {
              style = 'border-correct bg-correct/10 text-correct';
            } else if (answered && isSelected && !isCorrectAnswer) {
              style = 'border-incorrect bg-incorrect/10 text-incorrect';
            } else if (isSelected) {
              style = 'border-accent-blue bg-accent-blue/5 text-accent-blue';
            }

            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={cn(
                  'font-jp px-6 py-3 rounded-2xl border-2 text-lg font-medium transition-all',
                  style,
                  !answered && 'active:scale-95'
                )}
              >
                <JpText text={option} reading={getReading(option)} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-8">
        <button
          onClick={handleCheck}
          disabled={selected === null || answered}
          className={cn(
            'w-full py-4 rounded-2xl text-lg font-bold transition-all',
            selected !== null && !answered
              ? 'bg-primary text-white shadow-[0_4px_0_0_#B83A2A] active:shadow-none active:translate-y-1'
              : 'bg-gray-200 text-gray-400'
          )}
        >
          Check
        </button>
      </div>
    </div>
  );
}
