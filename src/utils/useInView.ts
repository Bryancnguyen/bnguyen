import { useCallback, useState, useRef } from "react";

// function to check if the ref needed is in view
export const useInView = (offset: number = 0) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      const onScroll = () => {
        if (node !== null) {
          const top = node.getBoundingClientRect().top;
          const bottom = node.getBoundingClientRect().bottom;
          setInView(top + offset >= 0 && bottom + offset <= window.innerHeight);
        }
      };

      window.addEventListener("scroll", onScroll);
      ref.current = node;
      return () => window.removeEventListener("scroll", onScroll);
    },
    [offset, setInView]
  );
  return { setRef, inView };
};
