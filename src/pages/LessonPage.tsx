import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonById, getMilestoneById, getNextLessonId, getUnitByLessonId, isMilestoneId } from '../data/course';
import { useSessionStore } from '../store/useSessionStore';
import { ExerciseRenderer } from '../components/exercises/ExerciseRenderer';
import { LessonProvider } from '../lib/LessonContext';
import { ReportBug } from '../components/common/ReportBug';
import { preloadLessonAudio, preloadLessonAudioInBackground, setActiveLessonAudio, stopSpeaking } from '../lib/speech';
import type { Exercise } from '../data/types';

function getExerciseContent(ex: Exercise): string {
  switch (ex.type) {
    case 'multiple_choice': return `Q: ${ex.prompt} | Options: ${ex.options.join(', ')}`;
    case 'fill_blank': return `Sentence: ${ex.sentence} | Answer: ${ex.answer}`;
    case 'word_order': return `Prompt: ${ex.prompt} | Answer: ${ex.correctOrder.join(' ')}`;
    case 'translation': return `Translate: ${ex.prompt} | Answer: ${ex.correctAnswer.join(' ')}`;
    case 'kana_build': return `Build: ${ex.prompt} | Answer: ${ex.correctChars.join('')}`;
    case 'matching': return `Match: ${ex.pairs.map(p => `${p.left}=${p.right}`).join(', ')}`;
    case 'grammar_intro': return `Grammar: ${ex.title}`;
    case 'vocab_intro': return `Vocab: ${ex.words.map(w => `${w.japanese}(${w.english})`).join(', ')}`;
    case 'listening': return `Listen: ${ex.audio} | Options: ${ex.options.join(', ')}`;
    case 'true_false': return `T/F: ${ex.japanese} = ${ex.english} (${ex.isCorrect})`;
    case 'dialogue_response': return `Dialogue: ${ex.speaker}: ${ex.speakerLine} | Options: ${ex.options.join(', ')}`;
    case 'kanji_reading': return `Kanji: ${ex.kanji} → ${ex.correctReading} | Options: ${ex.options.join(', ')}`;
    case 'reading': return `Read: ${ex.passage.slice(0, 40)}... | Q: ${ex.question}`;
  }
}

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [unitNumber, setUnitNumber] = useState(1);

  const {
    exercises,
    currentIndex,
    startLesson,
    submitAnswer,
    nextExercise,
    getCurrentExercise,
    isComplete,
    isRetryPhase,
    getRetryProgress,
    originalCount,
  } = useSessionStore();

  const isMilestone = lessonId ? isMilestoneId(lessonId) : false;

  useEffect(() => {
    if (!lessonId) return;
    const lesson = getLessonById(lessonId);
    const milestone = !lesson ? getMilestoneById(lessonId) : null;
    const exercises = lesson?.exercises ?? milestone?.exercises;
    if (!exercises) {
      navigate('/journey');
      return;
    }
    startLesson(lessonId, exercises);
    setActiveLessonAudio(lessonId);
    void preloadLessonAudio(lessonId).then(() => {
      const nextId = getNextLessonId(lessonId);
      if (nextId) {
        void preloadLessonAudioInBackground(nextId);
      }
    });
    const unit = getUnitByLessonId(lessonId);
    if (unit) setUnitNumber(parseInt(unit.id.split('-')[1]) || 1);

    return () => {
      setActiveLessonAudio(null);
      stopSpeaking();
    };
  }, [lessonId]);

  useEffect(() => {
    if (exercises.length > 0 && isComplete() && lessonId) {
      navigate(`/lesson/${lessonId}/complete`);
    }
  }, [currentIndex]);

  const currentExercise = getCurrentExercise();
  const inRetry = isRetryPhase();
  const retryProgress = getRetryProgress();
  const progress = originalCount > 0 ? (Math.min(currentIndex, originalCount) / originalCount) * 100 : 0;
  const retryPercent = inRetry && retryProgress.total > 0
    ? ((retryProgress.current - 1) / retryProgress.total) * 100
    : 0;

  const handleAnswer = (correct: boolean) => {
    if (!currentExercise) return;
    const isIntro = currentExercise.type === 'grammar_intro' || currentExercise.type === 'vocab_intro';
    submitAnswer(currentExercise.id, isIntro ? true : correct);
    // Small delay before advancing to next exercise
    setTimeout(() => {
      nextExercise();
    }, 200);
  };

  if (!currentExercise) {
    return null;
  }

  return (
    <LessonProvider unitNumber={unitNumber}>
    <div className="h-dvh flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-3 bg-surface rounded-full overflow-hidden flex">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${isMilestone ? 'bg-amber-500' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
          {inRetry && (
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${retryPercent * (1 - progress / 100)}%` }}
            />
          )}
        </div>

        <span className={`text-sm font-medium min-w-10 text-right ${inRetry ? 'text-amber-500' : 'text-gray-400'}`}>
          {inRetry
            ? `${retryProgress.current}/${retryProgress.total}`
            : `${Math.min(currentIndex + 1, originalCount)}/${originalCount}`
          }
        </span>
      </div>

      {/* Bug report */}
      <div className="px-4 flex justify-end -mt-1 mb-1">
        <ReportBug
          lessonId={lessonId ?? ''}
          exerciseId={currentExercise.id}
          exerciseType={currentExercise.type}
          exerciseNumber={currentIndex + 1}
          exerciseContent={getExerciseContent(currentExercise)}
        />
      </div>

      {/* Exercise area */}
      <div className="flex-1 overflow-hidden">
        <ExerciseRenderer
          exercise={currentExercise}
          onAnswer={handleAnswer}
        />
      </div>

      {/* Exit confirmation */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quit lesson?</h3>
            <p className="text-gray-500 mb-6">Your progress in this lesson will be lost.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  useSessionStore.getState().reset();
                  navigate('/journey');
                }}
                className="w-full py-3 bg-incorrect text-white font-bold rounded-2xl"
              >
                Quit
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
              >
                Keep Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </LessonProvider>
  );
}
