import { useThemeColors } from '@/store/themeStore';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const bookSources = [
  {
    id: 'time',
    title: 'TIME',
    logo: require('../assets/books/time.png'),
    description: '美国时代周刊',
    rssUrl: 'https://plink.anyfeeder.com/time',
  },
  {
    id: 'chinadaily',
    title: '中国日报',
    logo: require('../assets/books/chinadaily.png'),
    description: '中国国家级英文日报',
    rssUrl: 'https://feedx.net/rss/chinadaily.xml',
  },
  {
    id: 'vice',
    title: 'Vice',
    logo: require('../assets/books/vice.png'),
    description: '全球青年文化媒体',
    rssUrl: 'https://plink.anyfeeder.com/vice',
  },
  {
    id: 'bbc-news',
    title: 'BBC News',
    logo: require('../assets/books/bbc-news.png'),
    description: '英国广播公司',
    rssUrl: 'https://plink.anyfeeder.com/bbc',
  },
  {
    id: 'news-insider',
    title: 'Business Insider',
    logo: require('../assets/books/news-insider.png'),
    description: '商业科技资讯',
    rssUrl: 'https://plink.anyfeeder.com/businessinsider',
  },
  {
    id: 'thenewyorker',
    title: 'The New Yorker',
    logo: require('../assets/books/thenewyorker.png'),
    description: '纽约客杂志',
    rssUrl: 'https://feedx.net/rss/newyorker.xml',
  },
  {
    id: 'nfzm',
    title: '南方周末',
    logo: require('../assets/books/nfzm.png'),
    description: '广州综合性新闻周报',
    rssUrl: 'https://feedx.net/rss/infzm.xml',
  },
];

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
