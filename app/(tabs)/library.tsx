import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { ScrollView, StyleSheet, View } from 'react-native';
import BookCard from '../../components/BookCard';
import bookSourcesData from '../../assets/bookSources.json';

const logoMap: Record<string, any> = {
  'longreads': require('../../assets/books/longreads.png'),
  'time': require('../../assets/books/time.png'),
  'zerohedge': require('../../assets/books/zerohedge.png'),
  'chinadaily': require('../../assets/books/chinadaily.png'),
  'vice': require('../../assets/books/vice.png'),
  'bbc-news': require('../../assets/books/bbc-news.png'),
  'news-insider': require('../../assets/books/news-insider.png'),
  'bbc-technology': require('../../assets/books/bbc.png'),
  'bbc-world': require('../../assets/books/bbc-world-news.png'),
  'nfzm': require('../../assets/books/nfzm.png'),
};

const mockData = bookSourcesData.map(source => ({
  ...source,
  logo: logoMap[source.id],
}));

export default function LibraryScreen() {
  useSystemColorScheme();
  const { colors } = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {mockData.map((item, index) => (
          <BookCard key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 12,
  },
});
