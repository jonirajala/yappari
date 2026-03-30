import type { MilestoneReview } from '../types.ts';

export const milestone4: MilestoneReview = {
  id: 'milestone-4',
  title: 'Action Speaker',
  titleJp: 'チェックポイント',
  description:
    'Test everything from Units 1-14: greetings, identity, objects, family, numbers, time, places, food, verbs, adjectives, and daily routines.',
  afterUnitId: 'unit-14',
  exercises: [
    // 1. Matching — food/drink vocabulary (Unit 11)
    {
      id: 'ex-m4-01',
      type: 'matching',
      pairs: [
        { left: 'ごはん', right: 'rice / meal' },
        { left: 'みず', right: 'water' },
        { left: 'おちゃ', right: 'tea' },
        { left: 'パン', right: 'bread' },
        { left: 'にく', right: 'meat' },
      ],
    },
    // 2. Fill blank — を particle with verb (Unit 11)
    {
      id: 'ex-m4-02',
      type: 'fill_blank',
      sentence: 'パン ＿ たべます',
      answer: 'を',
      options: ['を', 'に', 'は', 'が'],
    },
    // 3. Word order — "Yesterday I went to school" with past tense + distractors (Units 9+10+14)
    {
      id: 'ex-m4-03',
      type: 'word_order',
      prompt: 'Yesterday I went to school.',
      correctOrder: ['きのう', 'がっこう', 'に', '行きました'],
      distractors: ['行きます', 'は', 'あした', 'を'],
    },
    // 4. Multiple choice — verb negative form identification (Unit 12)
    {
      id: 'ex-m4-04',
      type: 'multiple_choice',
      prompt: 'What is the negative form of よみます (to read)?',
      options: ['よみません', 'よみました', 'よみませんでした', 'よみます'],
      correctIndex: 0,
    },
    // 5. Fill blank — choosing correct verb tense (Unit 14)
    {
      id: 'ex-m4-05',
      type: 'fill_blank',
      sentence: 'きのうテレビを ＿',
      answer: 'みました',
      options: ['みました', 'みます', 'みません', 'みませんでした'],
      translation: 'Yesterday I watched TV.',
    },
    // 6. Matching — い-adjective forms: present/negative/past (Unit 13)
    {
      id: 'ex-m4-06',
      type: 'matching',
      pairs: [
        { left: 'あたらしい', right: 'new (present)' },
        { left: 'あたらしくないです', right: 'not new' },
        { left: 'あたらしかったです', right: 'was new' },
        { left: 'ふるい', right: 'old (present)' },
        { left: 'ふるくないです', right: 'not old' },
      ],
    },
    // 7. Word order — "I like tea" with すき + が + distractors (Unit 13)
    {
      id: 'ex-m4-07',
      type: 'word_order',
      prompt: 'I like tea.',
      correctOrder: ['わたし', 'は', 'おちゃ', 'が', 'すきです'],
      distractors: ['きらい', 'を', 'に', 'も'],
    },
    // 8. Kana build — べんきょう (study, no emoji) (Unit 12)
    {
      id: 'ex-m4-08',
      type: 'kana_build',
      prompt: 'study',
      correctChars: ['べ', 'ん', 'き', 'ょ', 'う'],
      distractors: ['し', 'ぶ', 'け', 'よ', 'ち'],
    },
    // 9. Multiple choice — な-adjective vs い-adjective distinction (Unit 13)
    {
      id: 'ex-m4-09',
      type: 'multiple_choice',
      prompt: 'Which of these is a な-adjective?',
      options: ['きれい', 'あたらしい', 'おおきい', 'ふるい'],
      correctIndex: 0,
    },
    // 10. Fill blank — な before noun for な-adjective (Unit 13)
    {
      id: 'ex-m4-10',
      type: 'fill_blank',
      sentence: 'しずか ＿ こうえん',
      answer: 'な',
      options: ['な', 'い', 'の', 'に'],
      translation: 'A quiet park.',
    },
    // 11. Reading — daily routine passage with tenses (multi-unit)
    {
      id: 'ex-m4-11',
      type: 'reading',
      passage:
        'わたしはまいにちあさごはんをたべます。\nきょうはパンをたべました。\nおちゃをのみました。\nひるはがっこうに行きます。',
      question: 'What did the speaker eat this morning?',
      options: ['Bread', 'Rice', 'Meat', 'Nothing'],
      correctIndex: 0,
    },
    // 12. Word order — "Every day I eat rice in the morning" + distractors (Units 9+11+14)
    {
      id: 'ex-m4-12',
      type: 'word_order',
      prompt: 'Every day I eat rice in the morning.',
      correctOrder: ['まいにち', 'あさ', 'ごはん', 'を', 'たべます'],
      distractors: ['よる', 'に', 'のみます', 'みず'],
    },
    // 13. Kanji reading — 食べます (no english) (Unit 11)
    {
      id: 'ex-m4-13',
      type: 'kanji_reading',
      kanji: '食べます',
      correctReading: 'たべます',
      options: ['たべます', 'のみます', 'みます', 'よみます'],
    },
    // 14. True/false — adjective sentence (Unit 13)
    {
      id: 'ex-m4-14',
      type: 'true_false',
      japanese: 'このへやはきれいです',
      english: 'This room is dirty.',
      isCorrect: false,
      correctEnglish: 'This room is clean/pretty.',
    },
    // 15. Dialogue response — someone offers food (Units 2+11)
    {
      id: 'ex-m4-15',
      type: 'dialogue_response',
      speaker: 'やまださん',
      speakerLine: 'ごはんをたべますか？',
      prompt: 'Accept the offer politely:',
      options: ['はい、いただきます', 'ごちそうさまでした', 'すみません', 'いいえ、きらいです'],
      correctIndex: 0,
    },
    // 16. Fill blank — particle choice (を/に/が/は) in a sentence (multi-unit)
    {
      id: 'ex-m4-16',
      type: 'fill_blank',
      sentence: 'わたしはこうえん ＿ 行きます',
      answer: 'に',
      options: ['に', 'を', 'が', 'は'],
    },
    // 17. Word order — "There is a person at the park" + distractors (Unit 10)
    {
      id: 'ex-m4-17',
      type: 'word_order',
      prompt: 'There is a person at the park.',
      correctOrder: ['こうえん', 'に', 'ひと', 'が', 'います'],
      distractors: ['あります', 'は', 'を', 'も'],
    },
    // 18. Matching — time/frequency words (Units 9+14)
    {
      id: 'ex-m4-18',
      type: 'matching',
      pairs: [
        { left: 'まいにち', right: 'every day' },
        { left: 'いつも', right: 'always' },
        { left: 'ときどき', right: 'sometimes' },
        { left: 'あさ', right: 'morning' },
        { left: 'しゅうまつ', right: 'weekend' },
      ],
    },
    // 19. Kanji reading — 毎日 (no english) (Unit 14)
    {
      id: 'ex-m4-19',
      type: 'kanji_reading',
      kanji: '毎日',
      correctReading: 'まいにち',
      options: ['まいにち', 'きょう', 'あした', 'きのう'],
    },
    // 20. Reading — longer passage about likes/dislikes and daily life (multi-unit)
    {
      id: 'ex-m4-20',
      type: 'reading',
      passage:
        'わたしはにくがすきです。おちゃもすきです。\nまいにちあさおちゃをのみます。\nきのうみせに行きました。\nにくをたべました。おいしかったです。\nよるはうちにいました。へやはしずかでした。',
      question: 'What does the speaker like?',
      options: [
        'Meat and tea',
        'Bread and water',
        'Rice and meat',
        'Tea and bread',
      ],
      correctIndex: 0,
    },
  ],
};
