import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

interface BookCardProps {
  title: string;
  description: string;
  lastUpdate: string;
  category: string;
  emoji: string;
  rssUrl: string;
}

export default function BookCard({ title, description, lastUpdate, category, emoji, rssUrl }: BookCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({
        pathname: '/book-detail',
        params: { title, description, category, emoji, rssUrl }
      })}
    >
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.lastUpdate}>{lastUpdate}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  lastUpdate: {
    fontSize: 14,
    color: '#666',
  },
  category: {
    fontSize: 14,
    color: '#999',
  },
});
