import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounceValue;
};
