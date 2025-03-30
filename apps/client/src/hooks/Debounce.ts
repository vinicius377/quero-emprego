import { useRef } from "react";

export function useDebounce (cb: (...params: unknown[]) => void, delay: number) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  return  (...args: unknown[]) => {
    if (timeoutId.current) { // This check is not strictly necessary
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(
      () => cb(...args), delay
    )
  }
}