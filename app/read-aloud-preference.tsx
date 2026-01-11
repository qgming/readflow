import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Gauge, Play, Volume2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomSwitch } from '../components/CustomSwitch';
import { SelectDrawer } from '../components/SelectDrawer';
import { useTheme } from '../contexts/Theme';
import { speakWord } from '../services/speechts';

export default function ReadAloudPreferenceScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [voiceDrawerVisible, setVoiceDrawerVisible] = useState(false);
  const [speedDrawerVisible, setSpeedDrawerVisible] = useState(false);
  const [voice, setVoice] = useState('en-US-JennyNeural');
  const [speed, setSpeed] = useState('1.0');
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet(['readAloudVoice', 'readAloudSpeed', 'readAloudAutoPlay']).then(([voiceData, speedData, autoPlayData]) => {
      if (voiceData[1]) setVoice(voiceData[1]);
      if (speedData[1]) setSpeed(speedData[1]);
      if (autoPlayData[1]) setAutoPlay(autoPlayData[1] === 'true');
    });
  }, []);

  const handleVoiceChange = (newVoice: string) => {
    setVoice(newVoice);
    AsyncStorage.setItem('readAloudVoice', newVoice);
  };

  const handleSpeedChange = (newSpeed: string) => {
    setSpeed(newSpeed);
    AsyncStorage.setItem('readAloudSpeed', newSpeed);
  };

  const handleAutoPlayToggle = (value: boolean) => {
    setAutoPlay(value);
    AsyncStorage.setItem('readAloudAutoPlay', value.toString());
  };

  const handleTest = async () => {
    try {
      await speakWord('Hello, this is a test.');
    } catch (error) {
      console.error('测试失败:', error);
    }
  };

  const voiceOptions = [
    { key: 'en-US-JennyNeural', label: 'Jenny (默认)' },
    { key: 'en-US-AriaNeural', label: 'Aria (活泼)' },
    { key: 'en-US-SaraNeural', label: 'Sara (柔和)' },
    { key: 'en-US-GuyNeural', label: 'Guy (成熟)' },
    { key: 'en-US-DavisNeural', label: 'Davis (沉稳)' },
    { key: 'en-US-TonyNeural', label: 'Tony (专业)' },
    { key: 'zh-CN-XiaoxiaoNeural', label: '晓晓 (温柔)' },
    { key: 'zh-CN-XiaoyiNeural', label: '晓伊 (甜美)' },
    { key: 'zh-CN-YunyangNeural', label: '云扬 (清新)' },
    { key: 'zh-CN-YunxiNeural', label: '云希 (阳光)' },
    { key: 'zh-CN-YunjianNeural', label: '云健 (浑厚)' },
    { key: 'zh-CN-YunfengNeural', label: '云枫 (磁性)' },
  ];

  const speedOptions = [
    { key: '0.5', label: '0.5x' },
    { key: '0.75', label: '0.75x' },
    { key: '1.0', label: '1.0x（正常）' },
    { key: '1.25', label: '1.25x' },
    { key: '1.5', label: '1.5x' },
    { key: '2.0', label: '2.0x' },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={28} />
        </Pressable>
        <View style={[styles.titleCapsule, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>朗读偏好</Text>
        </View>
        <Pressable style={[styles.testButton, { backgroundColor: colors.card }]} onPress={handleTest}>
          <Volume2 color={colors.text} size={24} />
        </Pressable>

        <View style={styles.content}>
          <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
            <Play size={24} color={colors.textSecondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>自动朗读</Text>
            <CustomSwitch value={autoPlay} onValueChange={handleAutoPlayToggle} />
          </View>

          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]} onPress={() => setVoiceDrawerVisible(true)}>
            <Volume2 size={24} color={colors.textSecondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>朗读音色</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {voiceOptions.find(opt => opt.key === voice)?.label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]} onPress={() => setSpeedDrawerVisible(true)}>
            <Gauge size={24} color={colors.textSecondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>朗读速度</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {speedOptions.find(opt => opt.key === speed)?.label}
            </Text>
          </TouchableOpacity>
        </View>

        <SelectDrawer
          visible={voiceDrawerVisible}
          onClose={() => setVoiceDrawerVisible(false)}
          items={voiceOptions}
          selectedKey={voice}
          onSelect={handleVoiceChange}
          title="选择朗读音色"
        />

        <SelectDrawer
          visible={speedDrawerVisible}
          onClose={() => setSpeedDrawerVisible(false)}
          items={speedOptions}
          selectedKey={speed}
          onSelect={handleSpeedChange}
          title="选择朗读速度"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleCapsule: {
    position: 'absolute',
    top: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    marginTop: 110,
    gap: 12,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 15,
  },
});
