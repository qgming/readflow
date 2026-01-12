import { useBookmarkStore } from '@/store/bookmarkStore';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Bookmark, ChevronLeft } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { formatArticleToParagraphs } from '../services/articleFormatter';

export default function ArticleDetail() {
  useSystemColorScheme();
  const { title, description } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useThemeColors();
  const addBookmark = useBookmarkStore((state) => state.addBookmark);

  const handleBookmark = () => {
    try {
      addBookmark(title as string, '', description as string);
      Alert.alert('成功', '文章已收藏');
    } catch {
      Alert.alert('错误', '收藏失败');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
        <ChevronLeft color={colors.text} size={28} />
      </Pressable>
      <Pressable style={[styles.saveButton, { backgroundColor: colors.card }]} onPress={handleBookmark}>
        <Bookmark color={colors.text} size={24} />
      </Pressable>
      <ScrollView>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.content}>
        {(formatArticleToParagraphs(description as string) || '暂无内容').split('\n').map((line: string, index: number) => (
          <Text key={index} style={[styles.text, { color: colors.text }]}>{line}</Text>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 16,
  },
});
