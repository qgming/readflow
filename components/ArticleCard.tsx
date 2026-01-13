import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translationService } from '@/services/translation';

interface ArticleCardProps {
  title: string;
  time: string;
  link?: string;
  description?: string;
  sourceId?: string;
}

export default function ArticleCard({ title, time, link, description, sourceId }: ArticleCardProps) {
  useSystemColorScheme();
  const router = useRouter();
  const { colors } = useThemeColors();
  const [translatedTitle, setTranslatedTitle] = useState<string>('');

  useEffect(() => {
    const loadTranslation = async () => {
      if (!link || !sourceId) return;

      const today = new Date().toDateString();
      const cacheKey = `translations_${sourceId}_${today}`;
      const cached = await AsyncStorage.getItem(cacheKey);

      if (cached) {
        const translations = JSON.parse(cached);
        if (translations[link]) {
          setTranslatedTitle(translations[link]);
          return;
        }
      }

      try {
        const translated = await translationService.translate(title);
        setTranslatedTitle(translated);

        const translations = cached ? JSON.parse(cached) : {};
        translations[link] = translated;
        await AsyncStorage.setItem(cacheKey, JSON.stringify(translations));
      } catch {}
    };

    loadTranslation();
  }, [title, link, sourceId]);

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => router.push({ pathname: '/article-detail', params: { title, link, description } })}
    >
      <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
      {translatedTitle && <Text style={[styles.translatedTitle, { color: colors.textSecondary }]} numberOfLines={2}>{translatedTitle}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  time: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  translatedTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 6,
  },
});
