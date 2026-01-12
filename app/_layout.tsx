import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import { initDatabase, initVocabulary } from '../database/db';
import { ecdictService } from '../services/ecdict';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const loadVocabulary = useVocabularyStore(state => state.loadVocabulary);
  const loadTheme = useThemeStore(state => state.loadTheme);

  useEffect(() => {
    async function initialize() {
      try {
        initDatabase();
        initVocabulary();
        await ecdictService.init();
        await loadTheme();
        loadVocabulary();
        setIsReady(true);
      } catch (error) {
        console.error('初始化失败:', error);
        setIsReady(true);
      }
    }
    initialize();
  }, [loadVocabulary, loadTheme]);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="book-detail" options={{ headerShown: false }} />
      <Stack.Screen name="article-detail" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
