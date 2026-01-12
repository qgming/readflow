import { router } from 'expo-router';
import { ChevronRight, Languages, Palette, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionMenu } from '../../components/ActionMenu';
import { useThemeStore, useSystemColorScheme } from '@/store/themeStore';

export default function MyScreen() {
  useSystemColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ x: number; y: number } | null>(null);
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);
  const colors = useThemeStore(state => state.colors);

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
       <View style={[styles.menuCard, { backgroundColor: colors.card }]}>
        <Palette size={24} color={colors.textSecondary} />
        <Text style={[styles.menuText, { color: colors.text }]}>主题模式</Text>
        <TouchableOpacity onPress={handleThemePress}>
          <Text style={[styles.themeValue, { color: colors.textSecondary }]}>{currentThemeLabel}</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={[styles.menuCard, { backgroundColor: colors.card }]}
        onPress={() => router.push('/translation-preference')}
      >
        <Languages size={24} color={colors.textSecondary} />
        <Text style={[styles.menuText, { color: colors.text }]}>翻译偏好</Text>
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuCard, { backgroundColor: colors.card }]}
        onPress={() => router.push('/read-aloud-preference')}
      >
        <Volume2 size={24} color={colors.textSecondary} />
        <Text style={[styles.menuText, { color: colors.text }]}>朗读偏好</Text>
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>



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
    gap: 12,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
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
