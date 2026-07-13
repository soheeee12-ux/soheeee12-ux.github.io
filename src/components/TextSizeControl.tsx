import { useEffect, useState } from 'react';

const SIZES = [87.5, 100, 112.5, 125];
const STORAGE_KEY = 'text-size-scale';

export default function TextSizeControl() {
  const [index, setIndex] = useState(1); // 기본값 100%

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const i = SIZES.indexOf(Number(saved));
      if (i !== -1) setIndex(i);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--text-scale', `${SIZES[index]}%`);
    window.localStorage.setItem(STORAGE_KEY, String(SIZES[index]));
  }, [index]);

  return (
    <div className="text-size">
      <span className="text-size__label">Text size</span>
      <button
        className="text-size__btn"
        onClick={() => setIndex((i) => Math.max(0, i - 1))}
        aria-label="Decrease text size"
        disabled={index === 0}
      >
        A−
      </button>
      <span className="text-size__value">{SIZES[index]}%</span>
      <button
        className="text-size__btn"
        onClick={() => setIndex((i) => Math.min(SIZES.length - 1, i + 1))}
        aria-label="Increase text size"
        disabled={index === SIZES.length - 1}
      >
        A+
      </button>
    </div>
  );
}