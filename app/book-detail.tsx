import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { fetchRSS, RSSItem } from '@/services/rss';

export default function BookDetailScreen() {
  const { title, description, emoji, rssUrl } = useLocalSearchParams();
  const router = useRouter();
  const [articles, setArticles] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rssUrl) {
      fetchRSS(rssUrl as string).then(data => {
        setArticles(data);
        setLoading(false);
      });
    }
  }, [rssUrl]);

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft color="#333" size={28} />
      </Pressable>
      <View style={styles.header}>
        <View style={styles.card}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>{emoji}</Text>
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
            <ArticleCard key={index} title={article.title} time={article.time} />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  },
  header: {
    backgroundColor: 'rgba(220, 180, 180, 0.3)',
    paddingTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoEmoji: {
    fontSize: 40,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  articlesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
