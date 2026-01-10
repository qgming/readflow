import { View, StyleSheet, ScrollView } from 'react-native';
import BookCard from '../../components/BookCard';

const mockData = [
  {
    title: 'BBC News',
    description: "The BBC is the world's leading public service broadcaster",
    lastUpdate: '2小时前',
    category: '新闻',
    emoji: '📰',
    rssUrl: 'https://plink.anyfeeder.com/bbc',
  },
  {
    title: 'TIME',
    description: 'Breaking news and analysis from TIME.com',
    lastUpdate: '5小时前',
    category: '新闻',
    emoji: '⏰',
    rssUrl: 'https://plink.anyfeeder.com/time',
  },
  {
    title: 'Business Insider',
    description: 'Business Insider is a fast-growing business site',
    lastUpdate: '1天前',
    category: '商业',
    emoji: '💼',
    rssUrl: 'https://plink.anyfeeder.com/businessinsider',
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
    backgroundColor: '#F5F5F5',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 12,
  },
});
