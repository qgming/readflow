import { Tabs } from 'expo-router';
import { BookOpen, Home, Library, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#007AFF',
      headerStyle: {
        backgroundColor: '#f9fafb',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0
      },
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        height: 80,
        paddingBottom: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
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
