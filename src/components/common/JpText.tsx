import { useUserStore } from '../../store/useUserStore';
import { getKanjiEntry } from '../../data/kanji';
import { useUnitNumber } from '../../lib/LessonContext';

interface Props {
  /** The kana form of the text (used as lookup key) */
  text: string;
  /** Romaji reading (for romaji display mode) */
  reading?: string;
  className?: string;
  /** Override: force a specific unit context for kanji display.
   *  If the current unit >= the kanji's introUnit, kanji is shown. */
  unitContext?: number;
}

/**
 * Smart Japanese text display component.
 * Handles three layers:
 * 1. Script mode: kana-only / kanji+furigana / kanji-only
 * 2. Romaji: optional reading below text
 * 3. Progressive kanji: only shows kanji introduced by the current unit
 */
export function JpText({ text, reading, className, unitContext }: Props) {
  const showRomaji = useUserStore((s) => s.showRomaji);
  const scriptMode = useUserStore((s) => s.scriptMode);
  const contextUnit = useUnitNumber();
  const unit = unitContext ?? contextUnit;

  const kanjiEntry = getKanjiEntry(text);
  // Only show kanji if the script mode allows it AND the kanji has been introduced
  const showKanji =
    scriptMode !== 'kana' &&
    kanjiEntry &&
    unit >= kanjiEntry.introUnit;

  // Render the main Japanese text
  const renderJapanese = () => {
    if (!showKanji || !kanjiEntry) {
      // Plain kana
      return <span className="font-jp">{text}</span>;
    }

    if (scriptMode === 'kanji') {
      // Kanji only, no furigana
      return <span className="font-jp">{kanjiEntry.kanji}</span>;
    }

    // Kanji + furigana using <ruby> tags
    return (
      <span className="font-jp">
        {kanjiEntry.segments.map((seg, i) =>
          seg.reading ? (
            <ruby key={i}>
              {seg.text}
              <rp>(</rp>
              <rt className="text-[0.6em] font-normal text-gray-400">{seg.reading}</rt>
              <rp>)</rp>
            </ruby>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
    );
  };

  // No romaji — just the Japanese
  if (!showRomaji || !reading) {
    return <span className={className ?? ''}>{renderJapanese()}</span>;
  }

  // With romaji below
  return (
    <span className={`inline-flex flex-col items-center ${className ?? ''}`}>
      {renderJapanese()}
      <span className="text-[0.6em] text-gray-400 leading-tight">{reading}</span>
    </span>
  );
}
