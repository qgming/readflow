import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { Stack, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import BookmarkCard from '../../components/BookmarkCard';
import BookSourceList from '../../components/BookSourceList';
import DailyQuote from '../../components/DailyQuote';
import { useBookmarkStore } from '../../store/bookmarkStore';

export default function HomeScreen() {
  useSystemColorScheme();
  const router = useRouter();
  const { colors } = useThemeColors();
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <BookmarkCard {...item} onDelete={removeBookmark} />}
          ListHeaderComponent={
            <>
              <DailyQuote />
              <BookSourceList />
              <View style={styles.myArticlesSection}>
                <Text style={[styles.myArticlesText, { color: colors.text }]}>我的文章</Text>
                <Pressable
                  style={[styles.iconButton, { backgroundColor: colors.card }]}
                  onPress={() => router.push('/my-articles')}
                >
                  <ChevronRight size={20} color={colors.textSecondary} />
                </Pressable>
              </View>
            </>
          }
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  list: {
    padding: 20,
  },
  myArticlesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  myArticlesText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
