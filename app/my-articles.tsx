import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Search, X } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import BookmarkCard from '../components/BookmarkCard';
import { useBookmarkStore } from '../store/bookmarkStore';

export default function MyArticlesScreen() {
  useSystemColorScheme();
  const { colors } = useThemeColors();
  const router = useRouter();
  const { bookmarks, removeBookmark } = useBookmarkStore();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return bookmarks;
    return bookmarks.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookmarks, searchQuery]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={28} />
        </Pressable>

        {searchVisible ? (
          <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="搜索文章..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            <Pressable onPress={() => { setSearchVisible(false); setSearchQuery(''); }}>
              <X size={20} color={colors.textSecondary} />
            </Pressable>
          </View>
        ) : (
          <>
            <View style={[styles.titleCapsule, { backgroundColor: colors.card }]}>
              <Text style={[styles.title, { color: colors.text }]}>我的文章</Text>
            </View>
            <Pressable style={[styles.searchButton, { backgroundColor: colors.card }]} onPress={() => setSearchVisible(true)}>
              <Search color={colors.text} size={20} />
            </Pressable>
          </>
        )}

        <FlatList
          data={filteredBookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookmarkCard {...item} onDelete={removeBookmark} />}
          contentContainerStyle={styles.list}
        />
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
  titleCapsule: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    height: 40,
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: '600',
  },
  searchButton: {
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
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 70,
    right: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  list: {
    marginTop: 100,
    padding: 20,
    paddingBottom: 160,
  },
});
