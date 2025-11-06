import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      // ✅ Handle both valid JSON and plain strings
      if (item === null) return initialValue;
      try {
        return JSON.parse(item);
      } catch {
        return item as unknown as T; // fallback for plain strings
      }
    } catch (error) {
      console.error("useLocalStorage get error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      // ✅ Store safely, always as JSON string
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("useLocalStorage set error:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
