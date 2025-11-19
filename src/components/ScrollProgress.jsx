import { useScrollProgress } from '../hooks/useScrollProgress.js';

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  );
};

