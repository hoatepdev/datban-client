const isBrowser = typeof window !== "undefined";

// localStorage utility functions with type safety and error handling

/**
 * Set an item in localStorage with proper serialization
 * @param key Storage key
 * @param value Value to store
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Get an item from localStorage with type safety and proper deserialization
 * @param key Storage key
 * @param defaultValue Default value if key doesn't exist
 * @returns The stored value or default value
 */
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

/**
 * Remove an item from localStorage
 * @param key Storage key to remove
 */
export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Check if a key exists in localStorage
 * @param key Storage key to check
 * @returns boolean indicating if key exists
 */
export const hasLocalStorage = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error("Error checking localStorage:", error);
    return false;
  }
};
