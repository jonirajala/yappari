/**
 * Auto-generates the exercise tables and statistics in COURSE.md
 * from the actual TypeScript course data.
 *
 * Usage: npm run course-doc
 *
 * Hand-written sections (Design Philosophy, Course Overview, etc.)
 * are preserved between <!-- MANUAL --> markers.
 * Everything between <!-- AUTO-START --> and <!-- AUTO-END --> is regenerated.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { course, milestones, journey } from '../src/data/course.ts';
import type { Exercise, MilestoneReview } from '../src/data/types.ts';

const COURSE_MD = resolve(import.meta.dirname, '..', 'docs', 'COURSE.md');

// --- Exercise description helpers ---

const TYPE_ABBREV: Record<string, string> = {
  multiple_choice: 'MC',
  matching: 'MA',
  fill_blank: 'FB',
  word_order: 'WO',
  kana_build: 'KB',
  translation: 'TR',
  grammar_intro: 'GI',
  vocab_intro: 'VI',
  listening: 'LI',
  true_false: 'TF',
  dialogue_response: 'DR',
  kanji_reading: 'KR',
  reading: 'RD',
};

function describeExercise(ex: Exercise): string {
  switch (ex.type) {
    case 'vocab_intro':
      return `Intro: ${ex.words.map((w) => w.japanese).join(', ')}`;
    case 'grammar_intro':
      return `"${ex.title}" — grammar explanation`;
    case 'multiple_choice':
      return `"${ex.prompt}" → ${ex.options[ex.correctIndex]}`;
    case 'matching':
      return `Match ${ex.pairs.length} pairs: ${ex.pairs.map((p) => `${p.left}=${p.right}`).join(', ')}`;
    case 'fill_blank': {
      const hint = ex.translation ? ` — "${ex.translation}"` : '';
      return `"${ex.sentence}" → ${ex.answer}${hint}`;
    }
    case 'word_order': {
      const dist = ex.distractors?.length ? ` (distractors: ${ex.distractors.join(', ')})` : '';
      return `"${ex.prompt}" → ${ex.correctOrder.join(' / ')}${dist}`;
    }
    case 'kana_build': {
      const emoji = ex.emoji ? ` ${ex.emoji}` : '';
      return `Build "${ex.prompt}"${emoji}: ${ex.correctChars.join(' ')} (distractors: ${ex.distractors.join(', ')})`;
    }
    case 'translation':
      return `"${ex.prompt}" → ${ex.correctAnswer.join(' ')}`;
    case 'listening':
      return `Listen: ${ex.audio} → ${ex.options.join(' / ')}`;
    case 'true_false': {
      const result = ex.isCorrect ? 'Correct' : `Wrong (${ex.correctEnglish ?? '?'})`;
      return `${ex.japanese} = "${ex.english}" → ${result}`;
    }
    case 'dialogue_response': {
      const prompt = ex.prompt ?? 'You reply:';
      return `${ex.speaker}: "${ex.speakerLine}" — ${prompt} → ${ex.options[ex.correctIndex]}`;
    }
    case 'kanji_reading': {
      const hint = ex.english ? ` (${ex.english})` : '';
      return `${ex.kanji}${hint} → ${ex.correctReading}`;
    }
    case 'reading': {
      const short = ex.passage.length > 30 ? ex.passage.slice(0, 30) + '...' : ex.passage;
      return `"${short}" — Q: ${ex.question} → ${ex.options[ex.correctIndex]}`;
    }
  }
}

// --- Generation ---

function generateLessonSection(
  lessonTitle: string,
  lessonTitleJp: string | undefined,
  vocabulary: { japanese: string; reading: string; english: string }[],
  exercises: Exercise[],
  headingLevel: string,
): string {
  const lines: string[] = [];

  lines.push(`${headingLevel} ${lessonTitle}`);
  lines.push('');

  if (vocabulary.length > 0) {
    lines.push(`**Vocabulary (${vocabulary.length} words):**`);
    lines.push('| Japanese | Reading | English |');
    lines.push('|----------|---------|---------|');
    for (const v of vocabulary) {
      lines.push(`| ${v.japanese} | ${v.reading} | ${v.english} |`);
    }
    lines.push('');
  }

  lines.push(`**Exercises (${exercises.length}):**`);
  lines.push('| # | Type | Exercise |');
  lines.push('|---|------|----------|');

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i];
    const abbrev = TYPE_ABBREV[ex.type] ?? ex.type;
    const desc = describeExercise(ex);
    lines.push(`| ${i + 1} | ${abbrev} | ${desc} |`);
  }

  lines.push('');
  return lines.join('\n');
}

function generateMilestoneSection(ms: MilestoneReview): string {
  const lines: string[] = [];
  lines.push(`## ⭐ ${ms.title} (after ${ms.afterUnitId})`);
  lines.push('');
  lines.push(`${ms.description}`);
  lines.push('');
  lines.push(`**Exercises (${ms.exercises.length}):**`);
  lines.push('| # | Type | Exercise |');
  lines.push('|---|------|----------|');

  for (let i = 0; i < ms.exercises.length; i++) {
    const ex = ms.exercises[i];
    const abbrev = TYPE_ABBREV[ex.type] ?? ex.type;
    const desc = describeExercise(ex);
    lines.push(`| ${i + 1} | ${abbrev} | ${desc} |`);
  }

  lines.push('');
  return lines.join('\n');
}

function generateStatistics(): string {
  const lines: string[] = [];

  lines.push('## Summary Statistics');
  lines.push('');

  // Lesson count
  lines.push('### Lesson Count by Unit');
  lines.push('| Unit | Lessons |');
  lines.push('|------|---------|');

  let totalLessons = 0;
  let milestoneIdx = 0;
  for (const unit of course) {
    if (unit.lessons.length > 0) {
      lines.push(`| ${unit.title} | ${unit.lessons.length} |`);
      totalLessons += unit.lessons.length;
    }
    if (milestoneIdx < milestones.length && milestones[milestoneIdx].afterUnitId === unit.id) {
      lines.push(`| ⭐ ${milestones[milestoneIdx].title} | 1 |`);
      totalLessons += 1;
      milestoneIdx++;
    }
  }
  lines.push(`| **Total** | **${totalLessons}** |`);
  lines.push('');

  // Exercise type distribution
  const typeCounts: Record<string, number> = {};
  let totalExercises = 0;

  for (const unit of course) {
    for (const lesson of unit.lessons) {
      for (const ex of lesson.exercises) {
        typeCounts[ex.type] = (typeCounts[ex.type] ?? 0) + 1;
        totalExercises++;
      }
    }
  }
  for (const ms of milestones) {
    for (const ex of ms.exercises) {
      typeCounts[ex.type] = (typeCounts[ex.type] ?? 0) + 1;
      totalExercises++;
    }
  }

  lines.push('### Exercise Type Distribution');
  lines.push('| Type | Count | % |');
  lines.push('|------|-------|---|');

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  for (const [type, count] of sortedTypes) {
    const abbrev = TYPE_ABBREV[type] ?? type;
    const pct = Math.round((count / totalExercises) * 100);
    lines.push(`| ${abbrev} (${type}) | ${count} | ${pct}% |`);
  }
  lines.push(`| **Total** | **${totalExercises}** | |`);
  lines.push('');

  // Vocabulary count
  lines.push('### Vocabulary by Unit');
  lines.push('| Unit | New Words | Cumulative |');
  lines.push('|------|-----------|-----------|');

  const allVocab: string[] = [];
  for (const unit of course) {
    const unitVocab = new Set<string>();
    for (const lesson of unit.lessons) {
      for (const v of lesson.vocabulary) {
        if (!allVocab.includes(v.japanese)) {
          unitVocab.add(v.japanese);
          allVocab.push(v.japanese);
        }
      }
    }
    if (unitVocab.size > 0) {
      lines.push(`| ${unit.title} | ${unitVocab.size} | ${allVocab.length} |`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

function generateVocabReference(): string {
  const lines: string[] = [];
  lines.push('## Complete Vocabulary Reference');
  lines.push('');
  lines.push('| # | Japanese | Reading | English | Introduced |');
  lines.push('|---|----------|---------|---------|-----------|');

  const seen = new Set<string>();
  let num = 1;

  for (const unit of course) {
    for (const lesson of unit.lessons) {
      for (const v of lesson.vocabulary) {
        if (!seen.has(v.japanese)) {
          seen.add(v.japanese);
          const lessonNum = lesson.id.replace('lesson-', 'L').replace(/^u(\d)-l(\d)$/, 'L$1.$2');
          lines.push(`| ${num} | ${v.japanese} | ${v.reading} | ${v.english} | ${lessonNum} |`);
          num++;
        }
      }
    }
  }
  lines.push('');
  return lines.join('\n');
}

// --- Main ---

function main() {
  const existing = readFileSync(COURSE_MD, 'utf-8');

  // Extract hand-written header (everything before first unit/milestone)
  const autoMarker = '<!-- AUTO-GENERATED BELOW - DO NOT EDIT MANUALLY -->';
  const manualEnd = existing.indexOf(autoMarker);

  let header: string;
  if (manualEnd !== -1) {
    header = existing.slice(0, manualEnd).trimEnd();
  } else {
    // First run — keep everything up to "## Unit 1" or "## Cumulative"
    const cutPoints = ['## Cumulative Vocabulary', '## Unit 1'];
    let cutIdx = -1;
    for (const marker of cutPoints) {
      const idx = existing.indexOf(marker);
      if (idx !== -1 && (cutIdx === -1 || idx < cutIdx)) {
        cutIdx = idx;
      }
    }
    header = cutIdx !== -1 ? existing.slice(0, cutIdx).trimEnd() : existing.trimEnd();
  }

  // Generate auto sections
  const sections: string[] = [];
  sections.push(autoMarker);
  sections.push('');

  // Units and milestones in journey order
  for (const item of journey) {
    if (item.type === 'unit') {
      const unit = item.unit;
      if (unit.lessons.length === 0) continue;

      sections.push(`## Unit ${unit.id.split('-')[1]}: ${unit.title}`);
      sections.push('');
      sections.push(`**Theme:** ${unit.description}`);
      sections.push('');
      sections.push('---');
      sections.push('');

      for (const lesson of unit.lessons) {
        const title = `${lesson.title}${lesson.titleJp ? ` (${lesson.titleJp})` : ''}`;
        sections.push(generateLessonSection(
          title,
          lesson.titleJp,
          lesson.vocabulary,
          lesson.exercises,
          '###',
        ));
        sections.push('---');
        sections.push('');
      }
    } else {
      sections.push(generateMilestoneSection(item.milestone));
      sections.push('---');
      sections.push('');
    }
  }

  // Statistics
  sections.push(generateStatistics());

  // Vocabulary reference
  sections.push(generateVocabReference());

  const output = header + '\n\n' + sections.join('\n');
  writeFileSync(COURSE_MD, output, 'utf-8');

  // Count exercises
  let total = 0;
  for (const unit of course) {
    for (const lesson of unit.lessons) {
      total += lesson.exercises.length;
    }
  }
  for (const ms of milestones) {
    total += ms.exercises.length;
  }

  console.log(`✓ Generated COURSE.md — ${course.filter(u => u.lessons.length > 0).length} units, ${milestones.length} milestones, ${total} exercises`);
}

main();
