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
  colors: ThemeColors;
  isDark: boolean;
}

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

  get colors() {
    const state = get();
    const isDark = state.theme === 'dark' || (state.theme === 'system' && state.systemColorScheme === 'dark');
    return isDark ? darkColors : lightColors;
  },

  get isDark() {
    const state = get();
    return state.theme === 'dark' || (state.theme === 'system' && state.systemColorScheme === 'dark');
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
