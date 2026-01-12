import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookmarkCard from '../../components/BookmarkCard';
import DailyQuote from '../../components/DailyQuote';
import { useBookmarkStore } from '../../store/bookmarkStore';

export default function HomeScreen() {
  useSystemColorScheme();
  const { colors } = useThemeColors();
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
        ListHeaderComponent={<DailyQuote />}
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
