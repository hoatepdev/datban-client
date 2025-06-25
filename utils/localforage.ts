import localforage from "localforage";
import packageJson from "../package.json";

// Configure localforage instance with custom settings
const configureStore = (storeName: string = "myApp") => {
  localforage.config({
    driver: [
      localforage.INDEXEDDB,
      localforage.WEBSQL,
      localforage.LOCALSTORAGE,
    ],
    name: packageJson.name,
    version: 1.0,
    storeName: storeName,
    description: "Database for application data",
  });
};

// Initialize different stores for different types of data
export const mainStore = localforage.createInstance({
  name: "mainStore",
});

export const userStore = localforage.createInstance({
  name: "userStore",
});

export const cacheStore = localforage.createInstance({
  name: "cacheStore",
});

// Utility functions for data operations
/**
 * Set an item in the specified store
 * @param store LocalForage instance
 * @param key Storage key
 * @param value Value to store
 */
export const setItem = async <T>(
  store: LocalForage,
  key: string,
  value: T,
): Promise<T> => {
  try {
    await store.setItem(key, value);
    return value;
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    throw error;
  }
};

/**
 * Get an item from the specified store
 * @param store LocalForage instance
 * @param key Storage key
 * @param defaultValue Default value if key doesn't exist
 */
export const getItem = async <T>(
  store: LocalForage,
  key: string,
  defaultValue: T,
): Promise<T> => {
  try {
    const value = await store.getItem<T>(key);
    return value === null ? defaultValue : value;
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Remove an item from the specified store
 * @param store LocalForage instance
 * @param key Storage key
 */
export const removeItem = async (
  store: LocalForage,
  key: string,
): Promise<void> => {
  try {
    await store.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all items from the specified store
 * @param store LocalForage instance
 */
export const clearStore = async (store: LocalForage): Promise<void> => {
  try {
    await store.clear();
  } catch (error) {
    console.error("Error clearing store:", error);
    throw error;
  }
};

/**
 * Get all keys from the specified store
 * @param store LocalForage instance
 */
export const getAllKeys = async (store: LocalForage): Promise<string[]> => {
  try {
    return await store.keys();
  } catch (error) {
    console.error("Error getting keys:", error);
    throw error;
  }
};

/**
 * Get the length/number of items in the specified store
 * @param store LocalForage instance
 */
export const getLength = async (store: LocalForage): Promise<number> => {
  try {
    return await store.length();
  } catch (error) {
    console.error("Error getting store length:", error);
    throw error;
  }
};

// Initialize the stores
configureStore();

// Export default store for general use
export default mainStore;
