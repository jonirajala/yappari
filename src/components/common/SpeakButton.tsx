import { speakJapanese, speakSlow } from '../../lib/speech';

interface Props {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SpeakButton({ text, size = 'md', className = '' }: Props) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  const iconSize = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        speakJapanese(text);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        speakSlow(text);
      }}
      className={`${sizeClasses[size]} rounded-full bg-accent-blue/10 flex items-center justify-center
                  text-accent-blue active:scale-90 transition-transform ${className}`}
      title="Tap to hear, double-tap for slow"
    >
      <svg width={iconSize[size]} height={iconSize[size]} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
      </svg>
    </button>
  );
}
