import { useTheme } from '@/contexts/Theme';
import { Volume2, X } from 'lucide-react-native';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { speakWord } from '@/services/speechts';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface WordDrawerProps {
  visible: boolean;
  word: string;
  onClose: () => void;
}

export default function WordDrawer({ visible, word, onClose }: WordDrawerProps) {
  const { colors } = useTheme();

  useEffect(() => {
    if (visible && word) {
      AsyncStorage.getItem('readAloudAutoPlay').then((autoPlay) => {
        if (autoPlay === 'true') {
          speakWord(word);
        }
      });
    }
  }, [visible, word]);

  const handleSpeak = () => {
    speakWord(word);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.drawer, { backgroundColor: colors.card }]} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={[styles.word, { color: colors.text }]}>{word}</Text>
            <View style={styles.buttonGroup}>
              <Pressable onPress={handleSpeak} style={styles.speakButton}>
                <Volume2 color={colors.text} size={24} />
              </Pressable>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <X color={colors.text} size={24} />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Pressable>
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
    height: SCREEN_HEIGHT * 0.6,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  speakButton: {
    padding: 4,
  },
  closeButton: {
    padding: 4,
  },
});
