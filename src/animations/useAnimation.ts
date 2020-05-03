import { useState, useEffect } from "react";

// React Hook referenced from : https://dev.to/spaciecat/video-simple-animations-with-react-hooks-5e29
export const useAnimation = (
  duration: number
): {
  progress: number;
  reset: () => void;
} => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const reset = () => setStartTime(Date.now());
  useEffect(() => {
    let queuedFrame = 0;
    const frame = () => {
      const now = Date.now() - startTime;
      if (now < duration) queuedFrame = requestAnimationFrame(frame);
      setProgress(easeInQuad(Math.min(1, now / duration)));
    };
    frame();
    return () => cancelAnimationFrame(queuedFrame);
  }, [startTime, duration, progress]);
  return { progress, reset };
};

// https://gist.github.com/gre/1650294 easing function
// function inOutQuad(t: number) {
//   return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
// }

function easeInQuad(t: number) {
  return t * t;
}
