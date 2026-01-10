import { Text, StyleSheet, Pressable } from 'react-native';

interface ArticleCardProps {
  title: string;
  time: string;
}

export default function ArticleCard({ title, time }: ArticleCardProps) {
  return (
    <Pressable style={styles.card}>
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
