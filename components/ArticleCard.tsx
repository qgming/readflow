import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface ArticleCardProps {
  title: string;
  time: string;
  link?: string;
  description?: string;
}

export default function ArticleCard({ title, time, link, description }: ArticleCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/article-detail', params: { title, link, description } })}
    >
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  time: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    lineHeight: 22,
  },
});
