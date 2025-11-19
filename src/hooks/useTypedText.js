import { useEffect, useMemo, useRef, useState } from 'react';

const defaultConfig = {
  typingDelay: 90,
  erasingDelay: 50,
  pauseDelay: 1400,
};

const phases = {
  typing: 'typing',
  pausing: 'pausing',
  deleting: 'deleting',
};

export const useTypedText = (phrases = [], config = {}) => {
  const mergedConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);
  const items = useMemo(() => (phrases.length ? phrases : ['Sk Akib Ahammed']), [phrases]);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(phases.typing);
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout;
    const currentPhrase = items[indexRef.current];

    if (phase === phases.typing) {
      setIsTyping(true);
      if (text === currentPhrase) {
        timeout = setTimeout(() => setPhase(phases.pausing), mergedConfig.pauseDelay);
        return () => clearTimeout(timeout);
      }

      const nextText = currentPhrase.slice(0, text.length + 1);
      timeout = setTimeout(() => {
        setText(nextText);
      }, mergedConfig.typingDelay);
    } else if (phase === phases.pausing) {
      setIsTyping(false);
      timeout = setTimeout(() => setPhase(phases.deleting), mergedConfig.pauseDelay);
    } else if (phase === phases.deleting) {
      const nextLength = Math.max(text.length - 1, 0);
      const nextText = currentPhrase.slice(0, nextLength);
      timeout = setTimeout(() => {
        setText(nextText);
        if (!nextText.length) {
          indexRef.current = (indexRef.current + 1) % items.length;
          setPhase(phases.typing);
        }
      }, mergedConfig.erasingDelay);
    }

    return () => clearTimeout(timeout);
  }, [items, mergedConfig.erasingDelay, mergedConfig.pauseDelay, mergedConfig.typingDelay, phase, text]);

  return { text, isTyping };
};

