import ArticleCard from '@/components/ArticleCard';
import { fetchRSS, RSSItem } from '@/services/rss';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoMap: Record<string, any> = {
  'longreads': require('../assets/books/longreads.png'),
  'time': require('../assets/books/time.png'),
  'zerohedge': require('../assets/books/zerohedge.png'),
  'chinadaily': require('../assets/books/chinadaily.png'),
  'vice': require('../assets/books/vice.png'),
  'bbc-news': require('../assets/books/bbc-news.png'),
  'news-insider': require('../assets/books/news-insider.png'),
  'bbc-technology': require('../assets/books/bbc.png'),
  'bbc-world': require('../assets/books/bbc-world-news.png'),
  'nfzm': require('../assets/books/nfzm.png'),
};

export default function BookDetailScreen() {
  useSystemColorScheme();
  const { id, title, description, rssUrl } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    rssUrl: string;
  }>();
  const router = useRouter();
  const { colors } = useThemeColors();
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = useCallback(async (forceRefresh = false) => {
    if (!rssUrl) return;

    const cacheKey = `articles_${id}_date`;
    const dataKey = `articles_${id}_data`;
    const today = new Date().toDateString();

    try {
      const lastFetchDate = await AsyncStorage.getItem(cacheKey);
      const cachedData = await AsyncStorage.getItem(dataKey);

      if (!forceRefresh && lastFetchDate === today && cachedData) {
        setArticles(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      setLoading(true);
      const data = await fetchRSS(rssUrl as string);
      setArticles(data);
      await AsyncStorage.setItem(cacheKey, today);
      await AsyncStorage.setItem(dataKey, JSON.stringify(data));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [rssUrl, id]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
        <ChevronLeft color={colors.text} size={28} />
      </Pressable>
      <Pressable style={[styles.refreshButton, { backgroundColor: colors.card }]} onPress={() => loadArticles(true)}>
        <RefreshCw color={colors.text} size={24} />
      </Pressable>
      <ScrollView>
        <View style={styles.header}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={logoMap[id as string]} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.articlesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.text} style={{ marginTop: 20 }} />
        ) : (
          articles.map((article, index) => (
            <ArticleCard key={index} title={article.title} time={article.time} link={article.link} description={article.description} sourceId={id} />
          ))
        )}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  refreshButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 140,
    height: 140,
  },
  info: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  articlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
