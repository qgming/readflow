import { Animated, Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/Theme';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function CustomSwitch({ value, onValueChange }: CustomSwitchProps) {
  const { colors } = useTheme();
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 20 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();
  }, [value, translateX]);

  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? colors.primary : colors.background },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: colors.card,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          { transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    elevation: 3,
  },
});
