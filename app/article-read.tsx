import { useTheme } from '@/contexts/Theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Languages } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getBookmarkById } from '../database/db';
import { formatArticleToParagraphs } from '../services/articleFormatter';

export default function ArticleRead() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const data = getBookmarkById(parseInt(id as string));
      setArticle(data);
    }
  }, [id]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const wordCount = (text: string) => {
    return text?.trim().split(/\s+/).filter(Boolean).length || 0;
  };

  if (!article) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>加载中...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={28} />
        </Pressable>
        <Pressable style={[styles.translateButton, { backgroundColor: colors.card }]} onPress={() => {}}>
          <Languages color={colors.text} size={22} />
        </Pressable>
        <ScrollView>
          <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
          <View style={styles.infoContainer}>
            <View style={[styles.capsule, { backgroundColor: colors.background === '#000000' ? '#3D3560' : '#E8E4FF' }]}>
              <Text style={[styles.capsuleText, { color: colors.background === '#000000' ? '#C4B8FF' : '#5B4BA8' }]}>
                {formatDate(article.created_at)}
              </Text>
            </View>
            <View style={[styles.capsule, { backgroundColor: colors.background === '#000000' ? '#5A3D28' : '#FFE8D6' }]}>
              <Text style={[styles.capsuleText, { color: colors.background === '#000000' ? '#FFD4A8' : '#B8733E' }]}>
                {wordCount(article.content)} 词
              </Text>
            </View>
            <View style={[styles.capsule, { backgroundColor: colors.background === '#000000' ? '#2A4A35' : '#D4F4DD' }]}>
              <Text style={[styles.capsuleText, { color: colors.background === '#000000' ? '#A8E6C1' : '#2D7A4A' }]}>
                {article.language || '已翻译 (ZH)'}
              </Text>
            </View>
          </View>
          <View style={styles.content}>
            {(formatArticleToParagraphs(article.content) || '暂无内容').split('\n').map((line: string, index: number) => (
              <Text key={index} style={[styles.text, { color: colors.text }]}>{line}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
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
  translateButton: {
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
  infoContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 1,
    marginBottom: 1,
  },
  capsule: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  capsuleText: {
    fontSize: 13,
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
