import { Tabs } from 'expo-router';
import { BookOpen, Home, Library, User } from 'lucide-react-native';
import { useThemeStore, useSystemColorScheme } from '@/store/themeStore';

export default function TabLayout() {
  useSystemColorScheme();
  const colors = useThemeStore(state => state.colors);

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary,
      headerTintColor: colors.text,
      headerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0
      },
      tabBarStyle: {
        backgroundColor: colors.tabBar,
        height: 80,
        paddingBottom: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        elevation: 0,
        shadowOpacity: 0
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="words"
        options={{
          title: '单词',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: '图书馆',
          tabBarIcon: ({ color, size }) => <Library color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
