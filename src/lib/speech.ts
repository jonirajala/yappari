let japaneseVoice: SpeechSynthesisVoice | null = null;

function getJapaneseVoice(): SpeechSynthesisVoice | null {
  if (japaneseVoice) return japaneseVoice;
  const voices = speechSynthesis.getVoices();
  // Prefer specific high-quality voices
  japaneseVoice =
    voices.find((v) => v.lang === 'ja-JP' && v.name.includes('Kyoko')) ??
    voices.find((v) => v.lang === 'ja-JP' && v.name.includes('O-Ren')) ??
    voices.find((v) => v.lang === 'ja-JP' && !v.name.includes('Google')) ??
    voices.find((v) => v.lang === 'ja-JP') ??
    voices.find((v) => v.lang.startsWith('ja')) ??
    null;
  return japaneseVoice;
}

// Pre-load voices (they load async in some browsers)
if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => {
    japaneseVoice = null;
    getJapaneseVoice();
  };
}

export function speakJapanese(text: string, rate: number = 0.85) {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = rate;
  utterance.pitch = 1;
  const voice = getJapaneseVoice();
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}

export function speakSlow(text: string) {
  speakJapanese(text, 0.6);
}
