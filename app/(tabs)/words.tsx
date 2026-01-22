import WordCard from '@/components/WordCard';
import WordDrawer from '@/components/WordDrawer';
import CapsuleToggle from '@/components/CapsuleToggle';
import LibraryCard from '@/components/LibraryCard';
import { getVocabulary, VocabularyWord } from '@/database/db';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import { useWordLibraryStore } from '@/store/wordLibraryStore';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const LIBRARIES = [
  { title: '中考', tag: 'zk', color: { light: '#E3F2FD', dark: '#1E3A5F' } },
  { title: '高考', tag: 'gk', color: { light: '#F3E5F5', dark: '#4A1E5F' } },
  { title: '四级', tag: 'cet4', color: { light: '#E8F5E9', dark: '#1E4A2F' } },
  { title: '六级', tag: 'cet6', color: { light: '#FFF3E0', dark: '#5F3A1E' } },
  { title: '考研', tag: 'ky', color: { light: '#FCE4EC', dark: '#5F1E3A' } },
  { title: '雅思', tag: 'ielts', color: { light: '#E0F2F1', dark: '#1E5F5A' } },
];

export default function WordsScreen() {
  useSystemColorScheme();
  const { colors } = useThemeColors();
  const { removeWord, vocabularySet } = useVocabularyStore();
  const { enabledLibraries, toggleLibrary, loadLibraries } = useWordLibraryStore();
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'library'>('vocabulary');

  const loadVocabulary = () => {
    const words = getVocabulary();
    setVocabulary(words);
  };

  useEffect(() => {
    loadVocabulary();
    loadLibraries();
  }, [vocabularySet, loadLibraries]);

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
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CapsuleToggle
          leftLabel="生词本"
          rightLabel="单词库"
          selectedSide={activeTab === 'vocabulary' ? 'left' : 'right'}
          onToggle={(side) => setActiveTab(side === 'left' ? 'vocabulary' : 'library')}
        />
        {activeTab === 'vocabulary' ? (
          vocabulary.length === 0 ? (
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
          )
        ) : (
          <View style={styles.libraryContainer}>
            {LIBRARIES.map((library) => (
              <LibraryCard
                key={library.tag}
                title={library.title}
                tag={library.tag}
                enabled={enabledLibraries.has(library.tag)}
                onToggle={toggleLibrary}
                color={library.color}
              />
            ))}
          </View>
        )}
        <WordDrawer visible={drawerVisible} word={selectedWord} onClose={handleDrawerClose} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
  libraryContainer: {
    paddingTop: 4,
  },
});
