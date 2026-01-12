import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useThemeStore, useSystemColorScheme } from '@/store/themeStore';
import { useBookmarkStore } from '../../store/bookmarkStore';
import BookmarkCard from '../../components/BookmarkCard';

export default function HomeScreen() {
  useSystemColorScheme();
  const colors = useThemeStore(state => state.colors);
  const { bookmarks, loadBookmarks, removeBookmark } = useBookmarkStore();

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BookmarkCard {...item} onDelete={removeBookmark} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
  },
});
