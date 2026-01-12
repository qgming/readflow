import { ecdictService, ECDICTWord } from '@/services/ecdict';
import { speakWord } from '@/services/speechts';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { useVocabularyStore } from '@/store/vocabularyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Star, Volume2, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import WordInfo from './WordInfo';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface WordDrawerProps {
  visible: boolean;
  word: string;
  onClose: () => void;
}

export default function WordDrawer({ visible, word, onClose }: WordDrawerProps) {
  useSystemColorScheme();
  const { colors } = useThemeColors();
  const isWordInVocabulary = useVocabularyStore(state => state.isWordInVocabulary);
  const addWord = useVocabularyStore(state => state.addWord);
  const removeWord = useVocabularyStore(state => state.removeWord);
  const [wordData, setWordData] = useState<ECDICTWord | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (visible && word) {
      setIsFavorite(isWordInVocabulary(word));

      AsyncStorage.getItem('readAloudAutoPlay').then((autoPlay) => {
        if (autoPlay === 'true') {
          speakWord(word);
        }
      });

      setLoading(true);
      ecdictService.queryWord(word).then((data) => {
        setWordData(data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [visible, word, isWordInVocabulary]);

  const handleSpeak = () => {
    speakWord(word);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeWord(word);
      setIsFavorite(false);
    } else {
      addWord(word);
      setIsFavorite(true);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.drawer, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.word, { color: colors.text }]}>{word}</Text>
            <View style={styles.buttonGroup}>
              <Pressable onPress={handleToggleFavorite} style={styles.favoriteButton}>
                <Star color={isFavorite ? '#FFD700' : colors.text} size={24} fill={isFavorite ? '#FFD700' : 'none'} />
              </Pressable>
              <Pressable onPress={handleSpeak} style={styles.speakButton}>
                <Volume2 color={colors.text} size={24} />
              </Pressable>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <X color={colors.text} size={24} />
              </Pressable>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <WordInfo wordData={wordData} loading={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.70,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  word: {
    fontSize: 24,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteButton: {
    padding: 4,
  },
  speakButton: {
    padding: 4,
  },
  closeButton: {
    padding: 4,
  },
});
