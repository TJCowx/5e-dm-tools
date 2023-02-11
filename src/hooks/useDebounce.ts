import { useEffect, useState } from 'react';

const useDebounce = (value: string, debounceMs: number) => {
  const [debouncedValued, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceMs]);

  return debouncedValued;
};

export default useDebounce;
