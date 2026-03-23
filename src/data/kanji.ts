/**
 * Kanji forms for vocabulary words.
 * Maps the kana form to { kanji, reading } pairs.
 *
 * `reading` is an array of { kanji, kana } segments for proper furigana rendering.
 * e.g. 学生 → [{ kanji: '学', kana: 'がく' }, { kanji: '生', kana: 'せい' }]
 *
 * For words that are just kana with no kanji form, they won't appear here.
 *
 * Kanji introduction follows Genki order:
 * - Unit 3: People (人, 先生, 学生, 友達...)
 * - Unit 4: Numbers & time (一〜十, 時, 日, 月...)
 * - Unit 5: Places & directions (大, 小, 上, 下...)
 * - Unit 6+: Actions (食べる, 飲む, 見る, 行く...)
 */

export interface KanjiEntry {
  /** Full kanji form of the word */
  kanji: string;
  /** Segments for furigana: each piece maps kanji character(s) to their reading */
  segments: { text: string; reading?: string }[];
  /** Which unit this kanji is introduced in (for progressive display) */
  introUnit: number;
}

export const kanjiMap: Record<string, KanjiEntry> = {
  // === Unit 3: People & Description ===
  'わたし': {
    kanji: '私',
    segments: [{ text: '私', reading: 'わたし' }],
    introUnit: 3,
  },
  'がくせい': {
    kanji: '学生',
    segments: [{ text: '学', reading: 'がく' }, { text: '生', reading: 'せい' }],
    introUnit: 3,
  },
  'せんせい': {
    kanji: '先生',
    segments: [{ text: '先', reading: 'せん' }, { text: '生', reading: 'せい' }],
    introUnit: 3,
  },
  'ともだち': {
    kanji: '友達',
    segments: [{ text: '友', reading: 'とも' }, { text: '達', reading: 'だち' }],
    introUnit: 3,
  },
  'ひと': {
    kanji: '人',
    segments: [{ text: '人', reading: 'ひと' }],
    introUnit: 3,
  },
  'おとこ': {
    kanji: '男',
    segments: [{ text: '男', reading: 'おとこ' }],
    introUnit: 3,
  },
  'おんな': {
    kanji: '女',
    segments: [{ text: '女', reading: 'おんな' }],
    introUnit: 3,
  },
  'こども': {
    kanji: '子供',
    segments: [{ text: '子', reading: 'こ' }, { text: '供', reading: 'ども' }],
    introUnit: 3,
  },
  'おかあさん': {
    kanji: 'お母さん',
    segments: [{ text: 'お' }, { text: '母', reading: 'かあ' }, { text: 'さん' }],
    introUnit: 3,
  },
  'おとうさん': {
    kanji: 'お父さん',
    segments: [{ text: 'お' }, { text: '父', reading: 'とう' }, { text: 'さん' }],
    introUnit: 3,
  },
  'いしゃ': {
    kanji: '医者',
    segments: [{ text: '医', reading: 'い' }, { text: '者', reading: 'しゃ' }],
    introUnit: 3,
  },
  'なまえ': {
    kanji: '名前',
    segments: [{ text: '名', reading: 'な' }, { text: '前', reading: 'まえ' }],
    introUnit: 3,
  },

  // === Unit 4: Numbers & Time ===
  'いち': {
    kanji: '一',
    segments: [{ text: '一', reading: 'いち' }],
    introUnit: 4,
  },
  'に': {
    kanji: '二',
    segments: [{ text: '二', reading: 'に' }],
    introUnit: 4,
  },
  'さん': {
    kanji: '三',
    segments: [{ text: '三', reading: 'さん' }],
    introUnit: 4,
  },
  'よん': {
    kanji: '四',
    segments: [{ text: '四', reading: 'よん' }],
    introUnit: 4,
  },
  'ご': {
    kanji: '五',
    segments: [{ text: '五', reading: 'ご' }],
    introUnit: 4,
  },
  'ろく': {
    kanji: '六',
    segments: [{ text: '六', reading: 'ろく' }],
    introUnit: 4,
  },
  'なな': {
    kanji: '七',
    segments: [{ text: '七', reading: 'なな' }],
    introUnit: 4,
  },
  'はち': {
    kanji: '八',
    segments: [{ text: '八', reading: 'はち' }],
    introUnit: 4,
  },
  'きゅう': {
    kanji: '九',
    segments: [{ text: '九', reading: 'きゅう' }],
    introUnit: 4,
  },
  'じゅう': {
    kanji: '十',
    segments: [{ text: '十', reading: 'じゅう' }],
    introUnit: 4,
  },
  'きょう': {
    kanji: '今日',
    segments: [{ text: '今', reading: 'きょ' }, { text: '日', reading: 'う' }],
    introUnit: 4,
  },
  'あした': {
    kanji: '明日',
    segments: [{ text: '明', reading: 'あ' }, { text: '日', reading: 'した' }],
    introUnit: 4,
  },
  'きのう': {
    kanji: '昨日',
    segments: [{ text: '昨', reading: 'きの' }, { text: '日', reading: 'う' }],
    introUnit: 4,
  },

  // === Unit 5: Places & Directions ===
  'がっこう': {
    kanji: '学校',
    segments: [{ text: '学', reading: 'がっ' }, { text: '校', reading: 'こう' }],
    introUnit: 5,
  },
  'おおきい': {
    kanji: '大きい',
    segments: [{ text: '大', reading: 'おお' }, { text: 'きい' }],
    introUnit: 5,
  },
  'ちいさい': {
    kanji: '小さい',
    segments: [{ text: '小', reading: 'ちい' }, { text: 'さい' }],
    introUnit: 5,
  },
  'うえ': {
    kanji: '上',
    segments: [{ text: '上', reading: 'うえ' }],
    introUnit: 5,
  },
  'した': {
    kanji: '下',
    segments: [{ text: '下', reading: 'した' }],
    introUnit: 5,
  },
  'みぎ': {
    kanji: '右',
    segments: [{ text: '右', reading: 'みぎ' }],
    introUnit: 5,
  },
  'ひだり': {
    kanji: '左',
    segments: [{ text: '左', reading: 'ひだり' }],
    introUnit: 5,
  },
  'まえ': {
    kanji: '前',
    segments: [{ text: '前', reading: 'まえ' }],
    introUnit: 5,
  },
  'うしろ': {
    kanji: '後ろ',
    segments: [{ text: '後', reading: 'うし' }, { text: 'ろ' }],
    introUnit: 5,
  },
  'なか': {
    kanji: '中',
    segments: [{ text: '中', reading: 'なか' }],
    introUnit: 5,
  },
  'やま': {
    kanji: '山',
    segments: [{ text: '山', reading: 'やま' }],
    introUnit: 5,
  },
  'かわ': {
    kanji: '川',
    segments: [{ text: '川', reading: 'かわ' }],
    introUnit: 5,
  },
  'いえ': {
    kanji: '家',
    segments: [{ text: '家', reading: 'いえ' }],
    introUnit: 5,
  },

  // === Unit 6: Daily Actions ===
  'たべる': {
    kanji: '食べる',
    segments: [{ text: '食', reading: 'た' }, { text: 'べる' }],
    introUnit: 6,
  },
  'のむ': {
    kanji: '飲む',
    segments: [{ text: '飲', reading: 'の' }, { text: 'む' }],
    introUnit: 6,
  },
  'みる': {
    kanji: '見る',
    segments: [{ text: '見', reading: 'み' }, { text: 'る' }],
    introUnit: 6,
  },
  'いく': {
    kanji: '行く',
    segments: [{ text: '行', reading: 'い' }, { text: 'く' }],
    introUnit: 6,
  },
  'くる': {
    kanji: '来る',
    segments: [{ text: '来', reading: 'く' }, { text: 'る' }],
    introUnit: 6,
  },
  'よむ': {
    kanji: '読む',
    segments: [{ text: '読', reading: 'よ' }, { text: 'む' }],
    introUnit: 6,
  },
  'かく': {
    kanji: '書く',
    segments: [{ text: '書', reading: 'か' }, { text: 'く' }],
    introUnit: 6,
  },
  'きく': {
    kanji: '聞く',
    segments: [{ text: '聞', reading: 'き' }, { text: 'く' }],
    introUnit: 6,
  },
  'はなす': {
    kanji: '話す',
    segments: [{ text: '話', reading: 'はな' }, { text: 'す' }],
    introUnit: 6,
  },

  // === Unit 7: Food & Shopping ===
  'みず': {
    kanji: '水',
    segments: [{ text: '水', reading: 'みず' }],
    introUnit: 7,
  },
  'たかい': {
    kanji: '高い',
    segments: [{ text: '高', reading: 'たか' }, { text: 'い' }],
    introUnit: 7,
  },
  'やすい': {
    kanji: '安い',
    segments: [{ text: '安', reading: 'やす' }, { text: 'い' }],
    introUnit: 7,
  },
  'あたらしい': {
    kanji: '新しい',
    segments: [{ text: '新', reading: 'あたら' }, { text: 'しい' }],
    introUnit: 7,
  },
  'ふるい': {
    kanji: '古い',
    segments: [{ text: '古', reading: 'ふる' }, { text: 'い' }],
    introUnit: 7,
  },
  'ほん': {
    kanji: '本',
    segments: [{ text: '本', reading: 'ほん' }],
    introUnit: 7,
  },
  'でんしゃ': {
    kanji: '電車',
    segments: [{ text: '電', reading: 'でん' }, { text: '車', reading: 'しゃ' }],
    introUnit: 7,
  },
  'くるま': {
    kanji: '車',
    segments: [{ text: '車', reading: 'くるま' }],
    introUnit: 7,
  },
};

/**
 * Get the kanji entry for a kana word, if one exists.
 */
export function getKanjiEntry(kana: string): KanjiEntry | undefined {
  return kanjiMap[kana];
}
