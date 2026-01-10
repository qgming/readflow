import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/Theme';

interface ArticleCardProps {
  title: string;
  time: string;
  link?: string;
  description?: string;
}

export default function ArticleCard({ title, time, link, description }: ArticleCardProps) {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => router.push({ pathname: '/article-detail', params: { title, link, description } })}
    >
      <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  time: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});
