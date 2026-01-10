import { View, Text, StyleSheet } from 'react-native';

export default function WordsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>单词</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
