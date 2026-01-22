import { useThemeColors } from '@/store/themeStore';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CapsuleToggleProps {
  leftLabel: string;
  rightLabel: string;
  selectedSide: 'left' | 'right';
  onToggle: (side: 'left' | 'right') => void;
}

export default function CapsuleToggle({ leftLabel, rightLabel, selectedSide, onToggle }: CapsuleToggleProps) {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Pressable
        style={[
          styles.side,
          selectedSide === 'left' && [
            styles.selected,
            { backgroundColor: colors.primary }
          ],
        ]}
        onPress={() => onToggle('left')}
      >
        <Text style={[styles.label, { color: selectedSide === 'left' ? '#FFFFFF' : colors.text }]}>
          {leftLabel}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.side,
          selectedSide === 'right' && [
            styles.selected,
            { backgroundColor: colors.primary }
          ],
        ]}
        onPress={() => onToggle('right')}
      >
        <Text style={[styles.label, { color: selectedSide === 'right' ? '#FFFFFF' : colors.text }]}>
          {rightLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  side: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  selected: {
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
