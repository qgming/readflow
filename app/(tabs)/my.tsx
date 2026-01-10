import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionMenu } from '../../components/ActionMenu';

export default function MyScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

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
    <View style={styles.container}>
      <View style={styles.menuList}>
        <View style={styles.menuItem}>
          <Ionicons name="color-palette-outline" size={24} color="#666" />
          <Text style={styles.menuText}>主题模式</Text>
          <TouchableOpacity onPress={handleThemePress}>
            <Text style={styles.themeValue}>{currentThemeLabel}</Text>
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
    backgroundColor: '#f9fafb',
    paddingTop: 16,
  },
  menuList: {
    backgroundColor: '#fff',
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
    color: '#333',
    marginLeft: 12,
  },
  themeValue: {
    fontSize: 15,
    color: '#999',
  },
});
