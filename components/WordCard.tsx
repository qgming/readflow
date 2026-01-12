import { VocabularyWord } from '@/database/db';
import { useThemeColors } from '@/store/themeStore';
import { MoreVertical } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionMenu } from './ActionMenu';

interface WordCardProps {
  word: VocabularyWord;
  onPress: (word: string) => void;
  onDelete: (word: string) => void;
}

export default function WordCard({ word, onPress, onDelete }: WordCardProps) {
  const { colors } = useThemeColors();
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMorePress = (event: any) => {
    event.target.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
      setAnchorPosition({ x: pageX + width, y: pageY + height });
      setMenuVisible(true);
    });
  };

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Pressable onPress={() => onPress(word.word)} style={styles.wordContent}>
          <Text style={[styles.wordText, { color: colors.text }]}>{word.word}</Text>
        </Pressable>
        <Pressable onPress={handleMorePress} style={styles.moreButton}>
          <MoreVertical color={colors.textSecondary} size={20} />
        </Pressable>
      </View>
      <ActionMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        anchorPosition={anchorPosition}
        actions={[
          { label: '删除单词', icon: 'trash-outline', onPress: () => onDelete(word.word) },
        ]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  wordContent: {
    flex: 1,
  },
  wordText: {
    fontSize: 18,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
  },
});
