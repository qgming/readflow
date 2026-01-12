import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { ScrollView, StyleSheet, View } from 'react-native';
import BookCard from '../../components/BookCard';

const mockData = [
    {
    id: 'time',
    title: 'TIME',
    description: '美国时代周刊，提供全球突发新闻、深度分析和独家报道',
    logo: require('../../assets/books/time.png'),
    rssUrl: 'https://plink.anyfeeder.com/time',
  },
    {
    id: 'chinadaily',
    title: '中国日报',
    description: '中国国家级英文日报，向世界传播中国声音和国际新闻',
    logo: require('../../assets/books/chinadaily.png'),
    rssUrl: 'https://feedx.net/rss/chinadaily.xml',
  },
    {
    id: 'vice',
    title: 'Vice',
    description: '全球青年文化媒体公司，关注前沿文化、社会议题和生活方式',
    logo: require('../../assets/books/vice.png'),
    rssUrl: 'https://plink.anyfeeder.com/vice',
  },
  {
    id: 'bbc-news',
    title: 'BBC News',
    description: '英国广播公司，全球领先的公共服务广播机构',
    logo: require('../../assets/books/bbc-news.png'),
    rssUrl: 'https://plink.anyfeeder.com/bbc',
  },
  {
    id: 'news-insider',
    title: 'Business Insider',
    description: '商业内幕，快速增长的商业新闻网站，聚焦科技与商业资讯',
    logo: require('../../assets/books/news-insider.png'),
    rssUrl: 'https://plink.anyfeeder.com/businessinsider',
  },


  {
    id: 'thenewyorker',
    title: 'The New Yorker',
    description: '纽约客杂志，提供深度政治文化报道、评论和文学作品',
    logo: require('../../assets/books/thenewyorker.png'),
    rssUrl: 'https://feedx.net/rss/newyorker.xml',
  },
  {
    id: 'nfzm',
    title: '南方周末',
    description: '广州综合性新闻周报，以深度调查报道和人文关怀著称',
    logo: require('../../assets/books/nfzm.png'),
    rssUrl: 'https://feedx.net/rss/infzm.xml',
  },
];

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
