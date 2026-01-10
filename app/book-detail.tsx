import ArticleCard from '@/components/ArticleCard';
import { fetchRSS, RSSItem } from '@/services/rss';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, RefreshCw } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const logoMap: Record<string, any> = {
  'bbc-news': require('../assets/books/bbc-news.png'),
  'time': require('../assets/books/time.png'),
  'news-insider': require('../assets/books/news-insider.png'),
  'vice': require('../assets/books/vice.png'),
};

export default function BookDetailScreen() {
  const { id, title, description, rssUrl } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    rssUrl: string;
  }>();
  const router = useRouter();
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadArticles = useCallback(() => {
    if (rssUrl) {
      setLoading(true);
      fetchRSS(rssUrl as string).then(data => {
        setArticles(data);
        setLoading(false);
      });
    }
  }, [rssUrl]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft color="#333" size={28} />
      </Pressable>
      <Pressable style={styles.refreshButton} onPress={loadArticles}>
        <RefreshCw color="#333" size={24} />
      </Pressable>
      <ScrollView>
        <View style={styles.header}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={logoMap[id as string]} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>

      <View style={styles.articlesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#333" style={{ marginTop: 20 }} />
        ) : (
          articles.map((article, index) => (
            <ArticleCard key={index} title={article.title} time={article.time} link={article.link} description={article.description} />
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
    backgroundColor: '#f9fafb',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'center',
  },
  articlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
