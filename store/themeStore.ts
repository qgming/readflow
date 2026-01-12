import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { useColorScheme } from 'react-native';
import { useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  tabBar: string;
  primary: string;
}

export const lightColors: ThemeColors = {
  background: '#f9fafb',
  card: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666',
  border: '#E5E5E5',
  tabBar: '#FFFFFF',
  primary: '#007AFF',
};

export const darkColors: ThemeColors = {
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  tabBar: '#1C1C1E',
  primary: '#0A84FF',
};

interface ThemeStore {
  theme: ThemeMode;
  systemColorScheme: 'light' | 'dark' | null;
  setTheme: (theme: ThemeMode) => void;
  setSystemColorScheme: (scheme: 'light' | 'dark' | null) => void;
  loadTheme: () => Promise<void>;
  getColors: () => ThemeColors;
  getIsDark: () => boolean;
}

const computeIsDark = (theme: ThemeMode, systemColorScheme: 'light' | 'dark' | null): boolean => {
  return theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
};

const computeColors = (theme: ThemeMode, systemColorScheme: 'light' | 'dark' | null): ThemeColors => {
  const isDark = computeIsDark(theme, systemColorScheme);
  return isDark ? darkColors : lightColors;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'system',
  systemColorScheme: null,

  setTheme: (newTheme: ThemeMode) => {
    set({ theme: newTheme });
    AsyncStorage.setItem('theme', newTheme);
  },

  setSystemColorScheme: (scheme: 'light' | 'dark' | null) => {
    set({ systemColorScheme: scheme });
  },

  loadTheme: async () => {
    const saved = await AsyncStorage.getItem('theme');
    if (saved) {
      set({ theme: saved as ThemeMode });
    }
  },

  getColors: () => {
    const state = get();
    return computeColors(state.theme, state.systemColorScheme);
  },

  getIsDark: () => {
    const state = get();
    return computeIsDark(state.theme, state.systemColorScheme);
  },
}));

// Hook to sync system color scheme
export function useSystemColorScheme() {
  const systemColorScheme = useColorScheme();
  const setSystemColorScheme = useThemeStore(state => state.setSystemColorScheme);

  useEffect(() => {
    setSystemColorScheme(systemColorScheme as 'light' | 'dark' | null);
  }, [systemColorScheme, setSystemColorScheme]);
}

// Custom hook to get theme colors with proper reactivity
export function useThemeColors() {
  const theme = useThemeStore(state => state.theme);
  const systemColorScheme = useThemeStore(state => state.systemColorScheme);

  const isDark = theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
  const colors = isDark ? darkColors : lightColors;

  return { colors, isDark };
}
