import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useThemeStore } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import { useBookmarkStore } from '@/store/bookmarkStore';
import { initDatabase, initVocabulary } from '../database/db';
import { ecdictService } from '../services/ecdict';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const loadVocabulary = useVocabularyStore(state => state.loadVocabulary);
  const loadTheme = useThemeStore(state => state.loadTheme);
  const loadBookmarks = useBookmarkStore(state => state.loadBookmarks);

  useEffect(() => {
    async function initialize() {
      try {
        initDatabase();
        initVocabulary();
        await ecdictService.init();
        await loadTheme();
        loadVocabulary();
        loadBookmarks();
      } catch (error) {
        console.error('初始化失败:', error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    initialize();
  }, [loadVocabulary, loadTheme, loadBookmarks]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="book-detail" options={{ headerShown: false }} />
      <Stack.Screen name="article-detail" options={{ headerShown: false }} />
    </Stack>
  );
}
