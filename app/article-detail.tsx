import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bookmark, ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatArticleToParagraphs } from '../services/articleFormatter';

export default function ArticleDetail() {
  const { title, description } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft color="#333" size={28} />
      </Pressable>
      <Pressable style={styles.saveButton} onPress={() => {}}>
        <Bookmark color="#333" size={24} />
      </Pressable>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {(formatArticleToParagraphs(description as string) || '暂无内容').split('\n').map((line: string, index: number) => (
          <Text key={index} style={styles.text}>{line}</Text>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    padding: 20,
    paddingTop: 100,
    lineHeight: 38,
  },
  content: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    lineHeight: 32,
    color: '#333',
    marginBottom: 16,
  },
});
