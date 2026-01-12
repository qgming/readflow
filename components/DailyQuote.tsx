import quotesData from '@/assets/quotes.json';
import { useThemeColors } from '@/store/themeStore';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Quote {
  en: string;
  zh: string;
  author?: string;
}

const quotes: Quote[] = quotesData;

export default function DailyQuote() {
  const { colors } = useThemeColors();
  const [showChinese, setShowChinese] = useState(false);

  // Get quote based on day of year to ensure same quote per day
  const getDailyQuote = (): Quote => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % quotes.length;
    return quotes[index];
  };

  const quote = getDailyQuote();
  const displayText = showChinese ? quote.zh : quote.en;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => setShowChinese(!showChinese)}
    >
      <Text style={[styles.quoteIcon, { color: colors.textSecondary }]}>&ldquo;</Text>
      <Text style={[styles.quoteText, { color: colors.text }]}>
        {displayText}
      </Text>
      {quote.author && (
        <Text style={[styles.author, { color: colors.textSecondary }]}>
          — {quote.author}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    overflow: 'visible',
    // zIndex: 1,
  },
  quoteIcon: {
    fontSize: 80,
    fontWeight: '700',
    lineHeight: 120,
    marginTop: -50,
    marginBottom: -60,
    opacity: 0.3,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'right',
  },
});
