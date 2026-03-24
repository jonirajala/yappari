import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';

interface Props {
  lessonId: string;
  exerciseId: string;
  exerciseType: string;
  exerciseNumber: number;
  /** Human-readable description of what the exercise shows */
  exerciseContent: string;
}

export function ReportBug({ lessonId, exerciseId, exerciseType, exerciseNumber, exerciseContent }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const user = useAuthStore((s) => s.user);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setSending(true);

    if (supabase) {
      await supabase.from('bug_reports').insert({
        user_id: user?.id ?? null,
        user_email: user?.email ?? null,
        lesson_id: lessonId,
        exercise_id: exerciseId,
        exercise_type: exerciseType,
        exercise_number: exerciseNumber,
        exercise_content: exerciseContent,
        message: message.trim(),
        user_agent: navigator.userAgent,
        url: window.location.href,
      });
    }

    setSending(false);
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setMessage('');
    }, 1500);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-gray-400 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
      >
        <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Report issue
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-5 max-w-sm w-full">
        {sent ? (
          <div className="text-center py-4">
            <span className="text-2xl">✓</span>
            <p className="text-sm text-gray-600 mt-2">Thanks! We'll look into it.</p>
          </div>
        ) : (
          <>
            <h3 className="text-base font-bold text-gray-800 mb-1">Report an issue</h3>
            <p className="text-xs text-gray-400 mb-3">Wrong translation, broken exercise, typo, etc.</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's wrong?"
              rows={3}
              className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl
                         focus:border-primary focus:outline-none resize-none mb-3"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setOpen(false); setMessage(''); }}
                className="flex-1 py-2.5 bg-gray-100 text-gray-500 text-sm font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || sending}
                className="flex-1 py-2.5 bg-primary text-white text-sm font-bold rounded-xl disabled:opacity-50"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
