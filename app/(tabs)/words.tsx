import WordCard from '@/components/WordCard';
import WordDrawer from '@/components/WordDrawer';
import { getVocabulary, VocabularyWord } from '@/database/db';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function WordsScreen() {
  useSystemColorScheme();
  const { colors } = useThemeColors();
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
    <WordCard word={item} onPress={handleWordPress} onDelete={handleDelete} />
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
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  listContent: {
    paddingBottom: 16,
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
