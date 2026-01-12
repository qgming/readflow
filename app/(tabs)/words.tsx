import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore, useSystemColorScheme } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import { getVocabulary, VocabularyWord } from '@/database/db';
import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react-native';
import WordDrawer from '@/components/WordDrawer';

export default function WordsScreen() {
  useSystemColorScheme();
  const colors = useThemeStore(state => state.colors);
  const removeWord = useVocabularyStore(state => state.removeWord);
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const loadVocabulary = () => {
    const words = getVocabulary();
    setVocabulary(words);
  };

  useEffect(() => {
    loadVocabulary();
  }, []);

  const handleWordPress = (word: string) => {
    setSelectedWord(word);
    setDrawerVisible(true);
  };

  const handleDelete = (word: string) => {
    removeWord(word);
    loadVocabulary();
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    loadVocabulary();
  };

  const renderItem = ({ item }: { item: VocabularyWord }) => (
    <View style={[styles.wordItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Pressable onPress={() => handleWordPress(item.word)} style={styles.wordContent}>
        <Text style={[styles.wordText, { color: colors.text }]}>{item.word}</Text>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          {new Date(item.created_at * 1000).toLocaleDateString()}
        </Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(item.word)} style={styles.deleteButton}>
        <Trash2 color={colors.textSecondary} size={20} />
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>生词本</Text>
      {vocabulary.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            暂无生词，点击文章中的单词并收藏即可添加
          </Text>
        </View>
      ) : (
        <FlatList
          data={vocabulary}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
      <WordDrawer visible={drawerVisible} word={selectedWord} onClose={handleDrawerClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  wordContent: {
    flex: 1,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
