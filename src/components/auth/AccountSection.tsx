import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthModal } from './AuthModal';

export function AccountSection() {
  const { user, signOut } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <section>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Account</h2>
        <div className="bg-surface rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Progress synced</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full py-2.5 bg-gray-100 text-gray-500 text-sm font-bold rounded-xl"
          >
            Sign Out
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">Account</h2>
        <div className="bg-surface rounded-2xl p-4">
          <p className="font-bold text-gray-800 mb-1">Save your progress</p>
          <p className="text-sm text-gray-400 mb-3">
            Create an account to sync across devices and never lose your progress.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full btn-primary text-sm py-3"
          >
            Sign In / Create Account
          </button>
        </div>
      </section>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
