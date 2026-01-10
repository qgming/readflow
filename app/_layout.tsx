import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/Theme';
import { initDatabase } from '../database/db';

export default function RootLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="book-detail" options={{ headerShown: false }} />
        <Stack.Screen name="article-detail" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
