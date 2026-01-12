import { useThemeColors } from '@/store/themeStore';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import bookSourcesData from '../assets/bookSources.json';

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

const bookSources = bookSourcesData.map(source => ({
  ...source,
  logo: logoMap[source.id],
}));

export default function BookSourceList() {
  const { colors } = useThemeColors();
  const router = useRouter();

  const handlePress = (item: typeof bookSources[0]) => {
    router.push({
      pathname: '/book-detail',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        rssUrl: item.rssUrl,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {bookSources.map((item) => (
          <Pressable key={item.id} style={[styles.bookItem, { backgroundColor: colors.card }]} onPress={() => handlePress(item)}>
            <View style={styles.logoContainer}>
              <Image source={item.logo} style={styles.bookLogo} resizeMode="contain" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
              <Text style={[styles.bookDescription, { color: colors.textSecondary }]} numberOfLines={2}>{item.description}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 20,
  },
  bookItem: {
    width: 200,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookLogo: {
    width: 76,
    height: 76,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
});
