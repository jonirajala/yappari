# Mojibun

A Duolingo-style Japanese learning app for learners who already know hiragana and katakana.

## Project Structure

- `src/data/v2/unit*.ts` — Exercise data for each unit (source of truth for course content)
- `src/data/v2/milestone*.ts` — Cross-unit milestone review exercises
- `src/data/course.ts` — Course structure, journey sequence, helper functions
- `src/data/types.ts` — All TypeScript interfaces (exercises, lessons, units, milestones)
- `src/components/exercises/` — One component per exercise type
- `src/pages/` — LessonPage, JourneyPage, LessonCompletePage
- `src/store/` — Zustand stores for session and progress

## Course Documentation

There are three docs that describe the course:

- `docs/COURSE_OVERVIEW.md` — **Hand-written.** High-level roadmap (unit themes, phases, grammar stages, milestone placement, design decisions). Edit this when planning future units or changing course direction.
- `docs/COURSE.md` — **Partially auto-generated.** The top section (Design Philosophy, Exercise Type Key) is hand-written. Everything below the `<!-- AUTO-GENERATED -->` marker is generated from code by `npm run course-doc`. Never edit the auto-generated section manually.
- `docs/course-design-research.md` — Research notes on JLPT N5 scope, Duolingo/LingoDeer structure, grammar progression, exercise types. Reference only.

## After Editing Course Content

When you add, remove, or modify exercises in any `src/data/v2/unit*.ts` or `milestone*.ts` file:

1. Run `npm run course-doc` to regenerate COURSE.md
2. If the change affects unit themes, milestone placement, or grammar progression, also update `docs/COURSE_OVERVIEW.md` manually

This keeps documentation in sync with the code automatically.

## Exercise Types

| Type | Component | Description |
|------|-----------|-------------|
| `multiple_choice` | MultipleChoice.tsx | Pick one of 4 options (shuffled) |
| `matching` | Matching.tsx | Match left items to right items |
| `fill_blank` | FillBlank.tsx | Fill in a blank in a sentence. Shows translation hint if `translation` field is set |
| `word_order` | WordOrder.tsx | Arrange words into correct sentence order. Supports `distractors` |
| `kana_build` | KanaBuild.tsx | Build a word from scattered kana characters |
| `translation` | Translation.tsx | Build Japanese sentence from word bank given English prompt |
| `listening` | Listening.tsx | Listen to TTS audio, pick what you heard. Has replay button |
| `true_false` | TrueFalse.tsx | Judge if a Japanese-English pairing is correct or wrong |
| `dialogue_response` | DialogueResponse.tsx | Read a speaker's line, pick the appropriate response |
| `kanji_reading` | KanjiReading.tsx | Show kanji, pick the correct kana reading. Shows english hint in lessons, not in quizzes |
| `reading` | Reading.tsx | Read a short Japanese passage, answer a comprehension question. Has play button for TTS |
| `grammar_intro` | GrammarIntro.tsx | Non-interactive grammar explanation |
| `vocab_intro` | VocabIntro.tsx | Non-interactive vocabulary introduction |

## Milestones

Milestone reviews sit between units on the journey map. They test all previous knowledge and require 70% to pass (vs 50% for regular lessons). They gate the next unit.

- Milestone 1: After Unit 3 (Survival Checkpoint)
- Milestone 2: After Unit 6 (Conversation Ready)

## Exercise Design Rules

- Options in multiple_choice, listening, and dialogue_response are shuffled at render time
- fill_blank: show `translation` hint only when the answer is ambiguous (e.g., noun blanks where multiple nouns fit). Omit translation for particle blanks where grammar constrains the answer
- When も is the answer in fill_blank, don't include は as an option (use です instead) to avoid ambiguity
- Unit quizzes should not have emoji hints on kana_build exercises
- Milestone exercises: no vocab_intro, no grammar_intro, no emoji hints, more distractors on word_order
- avoid ambiguity in exercises. Read questions and options carefully. Only one correct answer.