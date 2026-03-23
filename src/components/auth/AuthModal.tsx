import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface Props {
  onClose: () => void;
}

export function AuthModal({ onClose }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithMagicLink, loading } = useAuthStore();

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setError(null);
    const { error: err } = await signInWithMagicLink(email.trim());
    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
        {sent ? (
          <div className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Check your email!</h3>
            <p className="text-gray-500 mb-6">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Sign in with email
            </h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              We'll send you a magic link — no password needed.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-2xl
                         focus:border-primary focus:outline-none text-center mb-4"
              autoFocus
            />

            {error && (
              <p className="text-incorrect text-sm text-center mb-4">{error}</p>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={!email.trim() || loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
