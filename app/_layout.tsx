import { Stack } from 'expo-router';
import { ThemeProvider } from '../contexts/Theme';

export default function RootLayout() {
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
