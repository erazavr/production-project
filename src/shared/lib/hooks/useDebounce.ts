import { type MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback: () => void, delay: number) {
  const timer = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);
}
