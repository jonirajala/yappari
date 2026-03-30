import type { MilestoneReview } from '../types.ts';

export const milestone3: MilestoneReview = {
  id: 'milestone-3',
  title: 'World Builder',
  titleJp: 'チェックポイント',
  description:
    'Test everything from Units 1-10: greetings, identity, objects, possession, location, family, numbers, time, places, existence, and first verbs.',
  afterUnitId: 'unit-10',
  exercises: [
    // 1. Matching — family vocabulary (Unit 7)
    {
      id: 'ex-m3-01',
      type: 'matching',
      pairs: [
        { left: 'おかあさん', right: 'mother' },
        { left: 'おとうさん', right: 'father' },
        { left: 'おにいさん', right: 'older brother' },
        { left: 'おねえさん', right: 'older sister' },
        { left: 'おとうと', right: 'younger brother' },
        { left: 'いもうと', right: 'younger sister' },
      ],
    },
    // 2. Word order — "Where is the station?" with distractors (Unit 6)
    {
      id: 'ex-m3-02',
      type: 'word_order',
      prompt: 'Where is the station?',
      correctOrder: ['えき', 'は', 'どこ', 'です', 'か'],
      distractors: ['ここ', 'も', 'あそこ'],
    },
    // 3. Fill blank — choosing between あります and います (Unit 10)
    {
      id: 'ex-m3-03',
      type: 'fill_blank',
      sentence: 'こうえんにひとが ＿',
      answer: 'います',
      options: ['います', 'あります', '行きます', '来ます'],
      translation: 'There is a person at the park.',
    },
    // 4. Multiple choice — clock time question (Units 8+9)
    {
      id: 'ex-m3-04',
      type: 'multiple_choice',
      prompt: 'いまなんじですか — It is 3 o\'clock. How do you answer?',
      options: ['さんじです', 'さんさいです', 'みっつです', 'さんです'],
      correctIndex: 0,
    },
    // 5. Word order — "I go to school tomorrow" combining time + place + verb (Units 9+10)
    {
      id: 'ex-m3-05',
      type: 'word_order',
      prompt: 'Tomorrow I go to school.',
      correctOrder: ['あした', 'がっこう', 'に', '行きます'],
      distractors: ['来ます', 'は', 'で', 'きょう'],
    },
    // 6. Matching — numbers to kanji (Unit 8)
    {
      id: 'ex-m3-06',
      type: 'matching',
      pairs: [
        { left: '一', right: 'いち' },
        { left: '三', right: 'さん' },
        { left: '五', right: 'ご' },
        { left: '七', right: 'なな' },
        { left: '九', right: 'きゅう' },
        { left: '十', right: 'じゅう' },
      ],
    },
    // 7. Fill blank — に for time or place (Units 9+10)
    {
      id: 'ex-m3-07',
      type: 'fill_blank',
      sentence: 'げつようび ＿ がっこうに行きます',
      answer: 'に',
      options: ['に', 'は', 'で', 'も'],
      translation: 'I go to school on Monday.',
    },
    // 8. Kana build — a family word (Unit 7, no emoji)
    {
      id: 'ex-m3-08',
      type: 'kana_build',
      prompt: 'family',
      correctChars: ['か', 'ぞ', 'く'],
      distractors: ['ひ', 'と', 'お', 'さ', 'ん'],
    },
    // 9. Multiple choice — greeting for time of day (Units 1+9)
    {
      id: 'ex-m3-09',
      type: 'multiple_choice',
      prompt: 'It is morning (あさ). How do you greet someone?',
      options: ['おはようございます', 'こんにちは', 'こんばんは', 'おやすみなさい'],
      correctIndex: 0,
    },
    // 10. Word order — "My mother is kind" (Units 5+7)
    {
      id: 'ex-m3-10',
      type: 'word_order',
      prompt: 'My mother is a kind person.',
      correctOrder: ['わたし', 'の', 'おかあさん', 'は', 'やさしい', 'ひと', 'です'],
      distractors: ['おおきい', 'も', 'か'],
    },
    // 11. Reading comprehension — short passage combining family, time, places (multi-unit)
    {
      id: 'ex-m3-11',
      type: 'reading',
      passage:
        'わたしのおとうさんはいしゃです。\nおかあさんはせんせいです。\nおかあさんはがっこうにいます。',
      question: 'Where is the mother?',
      options: ['At school', 'At home', 'At the hospital', 'At the park'],
      correctIndex: 0,
    },
    // 12. Fill blank — particle choice (は/の/も/が) (Units 3-6)
    {
      id: 'ex-m3-12',
      type: 'fill_blank',
      sentence: 'だれ ＿ がくせいですか',
      answer: 'が',
      options: ['が', 'は', 'の', 'も'],
    },
    // 13. Kanji reading — number kanji (Unit 8, no english)
    {
      id: 'ex-m3-13',
      type: 'kanji_reading',
      kanji: '八',
      correctReading: 'はち',
      options: ['はち', 'ろく', 'よん', 'に'],
    },
    // 14. True/false — existence sentence (Unit 10)
    {
      id: 'ex-m3-14',
      type: 'true_false',
      japanese: 'ここにほんがあります',
      english: 'There is a book here',
      isCorrect: true,
    },
    // 15. Dialogue response — someone asks where something is (Unit 6+10)
    {
      id: 'ex-m3-15',
      type: 'dialogue_response',
      speaker: 'たなかさん',
      speakerLine: 'すみません、トイレはどこですか？',
      prompt: 'The bathroom is over there:',
      options: ['あそこです', 'ここです', 'あります', 'いいえ、ちがいます'],
      correctIndex: 0,
    },
    // 16. Word order — "There is a person at the park" with distractors (Unit 10)
    {
      id: 'ex-m3-16',
      type: 'word_order',
      prompt: 'There is a person at the park.',
      correctOrder: ['こうえん', 'に', 'ひと', 'が', 'います'],
      distractors: ['あります', 'は', 'の', 'も'],
    },
    // 17. Matching — time vocabulary (Unit 9)
    {
      id: 'ex-m3-17',
      type: 'matching',
      pairs: [
        { left: 'きょう', right: 'today' },
        { left: 'あした', right: 'tomorrow' },
        { left: 'きのう', right: 'yesterday' },
        { left: 'あさ', right: 'morning' },
        { left: 'よる', right: 'night' },
        { left: 'いま', right: 'now' },
      ],
    },
    // 18. Fill blank — adjective in sentence (Unit 7)
    {
      id: 'ex-m3-18',
      type: 'fill_blank',
      sentence: 'このくるまは ＿ です',
      answer: 'おおきい',
      options: ['おおきい', 'やさしい', 'がくせい', 'います'],
      translation: 'This car is big.',
    },
    // 19. Kanji reading — 学校 (Unit 10, no english)
    {
      id: 'ex-m3-19',
      type: 'kanji_reading',
      kanji: '学校',
      correctReading: 'がっこう',
      options: ['がっこう', 'がくせい', 'せんせい', 'こうえん'],
    },
    // 20. Reading comprehension — longer passage using time, places, verbs (multi-unit)
    {
      id: 'ex-m3-20',
      type: 'reading',
      passage:
        'きょうはげつようびです。\nあさ、わたしはがっこうに行きます。\nおにいさんもがっこうに行きます。\nおかあさんはうちにいます。\nよる、かぞくはうちにいます。',
      question: 'Who stays at home in the morning?',
      options: ['Mother', 'Older brother', 'The whole family', 'I (the speaker)'],
      correctIndex: 0,
    },
  ],
};
