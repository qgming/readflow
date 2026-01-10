import { Moon, Smartphone, Sun } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ActionItem {
  label: string;
  icon: string;
  onPress: () => void;
}

interface ActionMenuProps {
  visible: boolean;
  onClose: () => void;
  anchorPosition: { x: number; y: number } | null;
  actions: ActionItem[];
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  visible,
  onClose,
  anchorPosition,
  actions,
}) => {
  if (!anchorPosition) return null;

  const iconMap = {
    'sunny-outline': Sun,
    'moon-outline': Moon,
    'phone-portrait-outline': Smartphone,
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.menu, { top: anchorPosition.y, left: anchorPosition.x - 180 }]}>
          {actions.map((action, index) => {
            const Icon = iconMap[action.icon as keyof typeof iconMap];
            return (
              <Pressable
                key={index}
                style={styles.item}
                onPress={() => {
                  action.onPress();
                  onClose();
                }}
              >
                {Icon && <Icon size={18} color="#666" />}
                <Text style={styles.text}>{action.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 4,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
});
