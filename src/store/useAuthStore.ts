import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  initialize: async () => {
    if (!supabase || get().initialized) return;

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, initialized: true });
    });

    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user ?? null, initialized: true });
  },

  signUp: async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({ loading: false });
    if (!error && data.session) {
      set({ user: data.session.user });
    }
    if (!error && !data.session) {
      return { error: 'Check your email to confirm your account' };
    }
    return { error: error?.message ?? null };
  },

  signIn: async (email: string, password: string) => {
    if (!supabase) return { error: 'Supabase not configured' };
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({ loading: false });
    if (!error && data.session) {
      set({ user: data.session.user });
    }
    return { error: error?.message ?? null };
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
