import { ScrollView, StyleSheet, View } from 'react-native';
import BookCard from '../../components/BookCard';

const mockData = [
  {
    id: 'bbc-news',
    title: 'BBC News',
    description: "The BBC is the world's leading public service broadcaster",
    logo: require('../../assets/books/bbc-news.png'),
    rssUrl: 'https://plink.anyfeeder.com/bbc',
  },
  {
    id: 'time',
    title: 'TIME',
    description: 'Breaking news and analysis from TIME.com',
    logo: require('../../assets/books/time.png'),
    rssUrl: 'https://plink.anyfeeder.com/time',
  },
  {
    id: 'news-insider',
    title: 'Business Insider',
    description: 'Business Insider is a fast-growing business site',
    logo: require('../../assets/books/news-insider.png'),
    rssUrl: 'https://plink.anyfeeder.com/businessinsider',
  },
  {
    id: 'vice',
    title: 'Vice',
    description: 'Vice is a global youth media company',
    logo: require('../../assets/books/vice.png'),
    rssUrl: 'https://plink.anyfeeder.com/vice',
  },
];

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#f9fafb',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 12,
  },
});
