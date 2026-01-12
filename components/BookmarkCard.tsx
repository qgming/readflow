import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useRouter } from 'expo-router';
import { MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionMenu } from './ActionMenu';

interface BookmarkCardProps {
  id: number;
  title: string;
  created_at: number;
  onDelete?: (id: number) => void;
  onShare?: (id: number) => void;
}

export default function BookmarkCard({ id, title, created_at, onDelete, onShare }: BookmarkCardProps) {
  useSystemColorScheme();
  const router = useRouter();
  const { colors } = useThemeColors();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const showActionMenu = (event: any) => {
    event.stopPropagation();
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setMenuVisible(true);
  };

  const handleDelete = () => {
    Alert.alert('删除确认', '确定要删除这个书签吗？', [
      { text: '取消', style: 'cancel' },
      { text: '删除', style: 'destructive', onPress: () => onDelete?.(id) }
    ]);
  };

  const handleShare = () => {
    onShare?.(id);
  };

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.header}>
          <Text style={[styles.time, { color: colors.textSecondary }]}>{formatDate(created_at)}</Text>
          <Pressable style={styles.moreButton} onPress={showActionMenu}>
            <MoreHorizontal size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        <Pressable onPress={() => router.push({ pathname: '/article-read', params: { id: id.toString() } })}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
        </Pressable>
      </View>
      <ActionMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        anchorPosition={menuPosition}
        actions={[
          { label: '分享', icon: 'share-outline', onPress: handleShare },
          { label: '删除', icon: 'trash-outline', onPress: handleDelete }
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
});
