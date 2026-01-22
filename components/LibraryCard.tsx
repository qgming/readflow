import { useThemeColors } from '@/store/themeStore';
import { StyleSheet, Text, View } from 'react-native';
import { CustomSwitch } from './CustomSwitch';

interface LibraryCardProps {
  title: string;
  tag: string;
  enabled: boolean;
  onToggle: (tag: string) => void;
  color: { light: string; dark: string };
}

export default function LibraryCard({ title, tag, enabled, onToggle, color }: LibraryCardProps) {
  const { colors, isDark } = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={[styles.colorDot, { backgroundColor: color[isDark ? 'dark' : 'light'] }]} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <CustomSwitch value={enabled} onValueChange={() => onToggle(tag)} />
    </View>
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
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
});
