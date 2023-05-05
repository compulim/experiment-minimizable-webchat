import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevRef.current = value;
  });

  return prevRef.current;
}
