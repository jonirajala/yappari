/**
 * Romaji readings for all Japanese words/phrases used in exercises.
 * Keyed by the exact Japanese text that appears in exercise options, sentences, etc.
 */
export const readings: Record<string, string> = {
  // Greetings
  'こんにちは': 'konnichiwa',
  'おはようございます': 'ohayou gozaimasu',
  'おはよう': 'ohayou',
  'こんばんは': 'konbanwa',
  'さようなら': 'sayounara',
  'おやすみなさい': 'oyasuminasai',
  'いただきます': 'itadakimasu',
  'ごちそうさまでした': 'gochisousama deshita',
  'ありがとうございます': 'arigatou gozaimasu',
  'すみません': 'sumimasen',
  'はい': 'hai',
  'いいえ': 'iie',
  'おねがいします': 'onegaishimasu',
  'はじめまして': 'hajimemashite',
  'どうぞよろしく': 'douzo yoroshiku',
  'どうも': 'doumo',

  // Pronouns & basics
  'わたし': 'watashi',
  'がくせい': 'gakusei',
  'せんせい': 'sensei',
  'です': 'desu',
  'なまえ': 'namae',
  'なん': 'nan',
  'なに': 'nani',
  'おなまえ': 'onamae',
  'だれ': 'dare',

  // Particles
  'は': 'wa',
  'か': 'ka',
  'の': 'no',
  'も': 'mo',

  // Adjectives
  'おおきい': 'ookii',
  'を': 'wo',
  'が': 'ga',
  'に': 'ni',
  'で': 'de',
  'へ': 'e',
  'から': 'kara',

  // Nationalities
  'にほんじん': 'nihonjin',
  'アメリカじん': 'amerikajin',
  'じん': 'jin',

  // Negation
  'じゃないです': 'ja nai desu',

  // People
  'ともだち': 'tomodachi',
  'いしゃ': 'isha',
  'ひと': 'hito',
  'たなか': 'tanaka',
  'たなかさん': 'tanaka-san',
  'やまださん': 'yamada-san',
  'さん': '-san',

  // Self-intro
  'きました': 'kimashita',
  'アメリカ': 'amerika',
  'にほん': 'nihon',

  // Demonstratives
  'これ': 'kore',
  'それ': 'sore',
  'あれ': 'are',
  'この': 'kono',
  'その': 'sono',
  'あの': 'ano',
  'どれ': 'dore',
  'どの': 'dono',

  // Location
  'ここ': 'koko',
  'そこ': 'soko',
  'あそこ': 'asoko',
  'どこ': 'doko',

  // Objects
  'ほん': 'hon',
  'ペン': 'pen',
  'かばん': 'kaban',
  'でんわ': 'denwa',
  'とけい': 'tokei',
  'くるま': 'kuruma',
  'かさ': 'kasa',
  'テーブル': 'teeburu',
  'いす': 'isu',

  // Places
  'がっこう': 'gakkou',
  'えき': 'eki',
  'トイレ': 'toire',

  // Common phrases in exercises
  'わたしはがくせいです': 'watashi wa gakusei desu',
  'わたしはせんせいです': 'watashi wa sensei desu',
  'がくせいですか': 'gakusei desu ka',
  'にほんじんですか': 'nihonjin desu ka',
  'これはほんです': 'kore wa hon desu',
  'それはペンです': 'sore wa pen desu',
  'あれはなんですか': 'are wa nan desu ka',
  'このほんはわたしのです': 'kono hon wa watashi no desu',
  'そのかばんはだれのですか': 'sono kaban wa dare no desu ka',
  'わたしのほん': 'watashi no hon',
  'せんせいのくるま': 'sensei no kuruma',
  'だれのかさですか': 'dare no kasa desu ka',
  'わたしもがくせいです': 'watashi mo gakusei desu',
  'これもほんです': 'kore mo hon desu',
  'わたしはいしゃじゃないです': 'watashi wa isha ja nai desu',
  'せんせいはわたしです': 'sensei wa watashi desu',
  'がくせいはせんせいです': 'gakusei wa sensei desu',
};

/**
 * Get romaji reading for a Japanese text.
 * Returns undefined if no reading is found.
 */
export function getReading(japanese: string): string | undefined {
  return readings[japanese];
}
