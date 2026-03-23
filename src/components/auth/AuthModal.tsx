import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface Props {
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function AuthModal({ onClose, defaultMode = 'signup' }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(defaultMode === 'signup');
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, loading } = useAuthStore();

  const handleSubmit = async () => {
    if (!email.trim() || !password) return;
    setError(null);

    const { error: err } = isSignUp
      ? await signUp(email.trim(), password)
      : await signIn(email.trim(), password);

    if (err) {
      setError(err);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h3>
        <p className="text-gray-400 text-sm text-center mb-6">
          {isSignUp ? 'Save your progress across devices' : 'Welcome back!'}
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-2xl
                     focus:border-primary focus:outline-none mb-3"
          autoFocus
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Password"
          className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-2xl
                     focus:border-primary focus:outline-none mb-4"
        />

        {error && (
          <p className="text-incorrect text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={!email.trim() || !password || loading}
            className="w-full btn-primary disabled:opacity-50"
          >
            {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
            className="text-sm text-gray-400 text-center"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
