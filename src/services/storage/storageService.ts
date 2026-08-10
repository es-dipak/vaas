const PREFIX = 'vaas_';

export const storageService = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch {
      console.error(`Failed to save "${key}" to localStorage`);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear(): void {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
};
