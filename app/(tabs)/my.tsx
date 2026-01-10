import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionMenu } from '../../components/ActionMenu';
import { useTheme } from '../../contexts/Theme';

export default function MyScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
  const { theme, setTheme, colors } = useTheme();

  const themeOptions = [
    { key: 'light', label: '浅色模式', icon: 'sunny-outline' },
    { key: 'dark', label: '深色模式', icon: 'moon-outline' },
    { key: 'system', label: '跟随系统', icon: 'phone-portrait-outline' },
  ];

  const currentThemeLabel = themeOptions.find(opt => opt.key === theme)?.label || '跟随系统';

  const handleThemePress = (event: any) => {
    event.target.measure((_x: number, _y: number, width: number, height: number, pageX: number, pageY: number) => {
      setAnchorPosition({ x: pageX + width, y: pageY + height });
      setMenuVisible(true);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.menuList, { backgroundColor: colors.card }]}>
        <View style={styles.menuItem}>
          <Ionicons name="color-palette-outline" size={24} color={colors.textSecondary} />
          <Text style={[styles.menuText, { color: colors.text }]}>主题模式</Text>
          <TouchableOpacity onPress={handleThemePress}>
            <Text style={[styles.themeValue, { color: colors.textSecondary }]}>{currentThemeLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ActionMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        anchorPosition={anchorPosition}
        actions={themeOptions.map(option => ({
          label: option.label,
          icon: option.icon,
          onPress: () => setTheme(option.key as any),
        }))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  menuList: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  themeValue: {
    fontSize: 15,
  },
});
