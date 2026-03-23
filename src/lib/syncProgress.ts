import { supabase } from './supabase';
import { useUserStore } from '../store/useUserStore';
import { useProgressStore } from '../store/useProgressStore';
import type { LessonResult } from '../data/types';

/**
 * Merge two sets of completed lessons, keeping the better result for each.
 */
function mergeLessons(
  local: Record<string, LessonResult>,
  remote: Record<string, LessonResult>
): Record<string, LessonResult> {
  const merged = { ...remote };
  for (const [lessonId, localResult] of Object.entries(local)) {
    const remoteResult = merged[lessonId];
    if (!remoteResult) {
      merged[lessonId] = localResult;
    } else {
      merged[lessonId] =
        localResult.stars > remoteResult.stars ||
        (localResult.stars === remoteResult.stars && localResult.score > remoteResult.score)
          ? localResult
          : remoteResult;
    }
  }
  return merged;
}

function calcXp(lessons: Record<string, LessonResult>): number {
  return Object.values(lessons).reduce((sum, r) => sum + r.score, 0);
}

/**
 * Push current localStorage state to Supabase.
 * Used when user creates account for the first time.
 */
export async function pushLocalToSupabase(userId: string) {
  if (!supabase) return;

  const userState = useUserStore.getState();
  const progressState = useProgressStore.getState();

  await supabase.from('user_settings').upsert({
    id: userId,
    name: userState.name,
    has_completed_onboarding: userState.hasCompletedOnboarding,
    show_romaji: userState.showRomaji,
    script_mode: userState.scriptMode,
  });

  await supabase.from('user_progress').upsert({
    id: userId,
    completed_lessons: progressState.completedLessons,
    total_xp: progressState.totalXp,
  });
}

/**
 * Pull Supabase state into localStorage.
 * Used when user signs in on a new device.
 */
export async function pullSupabaseToLocal(userId: string) {
  if (!supabase) return;

  const { data: settings } = await supabase
    .from('user_settings')
    .select('*')
    .eq('id', userId)
    .single();

  if (settings) {
    const store = useUserStore.getState();
    store.setName(settings.name);
    if (settings.has_completed_onboarding) store.completeOnboarding();
    if (settings.show_romaji !== store.showRomaji) store.toggleRomaji();
    store.setScriptMode(settings.script_mode);
  }

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('id', userId)
    .single();

  if (progress) {
    const store = useProgressStore.getState();
    // Replace local progress with remote
    for (const [, result] of Object.entries(progress.completed_lessons as Record<string, LessonResult>)) {
      store.completeLesson(result);
    }
  }
}

/**
 * Smart merge: compare local and remote, keep best, sync both.
 * Called on sign-in.
 */
export async function mergeAndSync(userId: string) {
  if (!supabase) return;

  const localProgress = useProgressStore.getState().completedLessons;

  const { data: remoteProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('id', userId)
    .single();

  const remoteLessons = (remoteProgress?.completed_lessons ?? {}) as Record<string, LessonResult>;

  const hasLocal = Object.keys(localProgress).length > 0;
  const hasRemote = Object.keys(remoteLessons).length > 0;

  if (!hasLocal && !hasRemote) {
    // Brand new — just push settings
    await pushLocalToSupabase(userId);
    return;
  }

  if (!hasLocal && hasRemote) {
    // New device — pull everything
    await pullSupabaseToLocal(userId);
    return;
  }

  if (hasLocal && !hasRemote) {
    // First sign-up — push local to cloud
    await pushLocalToSupabase(userId);
    return;
  }

  // Both have data — merge
  const merged = mergeLessons(localProgress, remoteLessons);
  const totalXp = calcXp(merged);

  // Update local
  const progressStore = useProgressStore.getState();
  for (const result of Object.values(merged)) {
    progressStore.completeLesson(result);
  }

  // Update remote
  await supabase.from('user_progress').upsert({
    id: userId,
    completed_lessons: merged,
    total_xp: totalXp,
  });

  // Also sync settings
  await pushLocalToSupabase(userId);
}

/**
 * Incremental sync after lesson completion.
 * Called from the store subscriber.
 */
export async function syncProgressToSupabase(userId: string) {
  if (!supabase) return;

  const { completedLessons, totalXp } = useProgressStore.getState();

  await supabase.from('user_progress').upsert({
    id: userId,
    completed_lessons: completedLessons,
    total_xp: totalXp,
  });
}

/**
 * Sync user settings to Supabase.
 */
export async function syncSettingsToSupabase(userId: string) {
  if (!supabase) return;

  const state = useUserStore.getState();

  await supabase.from('user_settings').upsert({
    id: userId,
    name: state.name,
    has_completed_onboarding: state.hasCompletedOnboarding,
    show_romaji: state.showRomaji,
    script_mode: state.scriptMode,
  });
}

/**
 * Clear all Supabase data (used when user resets progress while signed in).
 */
export async function clearSupabaseProgress(userId: string) {
  if (!supabase) return;

  await supabase.from('user_progress').upsert({
    id: userId,
    completed_lessons: {},
    total_xp: 0,
  });
}
