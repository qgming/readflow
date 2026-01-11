import React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/Theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface SelectItem {
  key: string;
  label: string;
}

interface SelectDrawerProps {
  visible: boolean;
  onClose: () => void;
  items: SelectItem[];
  selectedKey?: string;
  onSelect: (key: string) => void;
  title?: string;
}

export const SelectDrawer: React.FC<SelectDrawerProps> = ({
  visible,
  onClose,
  items,
  selectedKey,
  onSelect,
  title,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.drawer, { backgroundColor: colors.card }]} onPress={(e) => e.stopPropagation()}>
          {title && (
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            </View>
          )}
          <ScrollView style={styles.list}>
            {items.map((item) => (
              <Pressable
                key={item.key}
                style={[
                  styles.item,
                  selectedKey === item.key && { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                ]}
                onPress={() => {
                  onSelect(item.key);
                  onClose();
                }}
              >
                <Text style={[styles.itemText, { color: selectedKey === item.key ? colors.text : colors.textSecondary }]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  itemText: {
    fontSize: 16,
  },
});
