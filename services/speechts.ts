import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import AsyncStorage from '@react-native-async-storage/async-storage';

let currentPlayer: ReturnType<typeof createAudioPlayer> | null = null;

setAudioModeAsync({
  playsInSilentMode: true,
});

const getVoiceName = (voice: string): string => {
  const voiceMap: Record<string, string> = {
    'en-US-JennyNeural': 'en-US-JennyNeural',
    'en-US-AriaNeural': 'en-US-AriaNeural',
    'en-US-SaraNeural': 'en-US-SaraNeural',
    'en-US-GuyNeural': 'en-US-GuyNeural',
    'en-US-DavisNeural': 'en-US-DavisNeural',
    'en-US-TonyNeural': 'en-US-TonyNeural',
    'zh-CN-XiaoxiaoNeural': 'zh-CN-XiaoxiaoNeural',
    'zh-CN-XiaoyiNeural': 'zh-CN-XiaoyiNeural',
    'zh-CN-YunyangNeural': 'zh-CN-YunyangNeural',
    'zh-CN-YunxiNeural': 'zh-CN-YunxiNeural',
    'zh-CN-YunjianNeural': 'zh-CN-YunjianNeural',
    'zh-CN-YunfengNeural': 'zh-CN-YunfengNeural',
  };
  return voiceMap[voice] || 'en-US-JennyNeural';
};

export const speakWord = async (text: string) => {
  try {
    if (currentPlayer) {
      currentPlayer.remove();
      currentPlayer = null;
    }

    const [voiceData, speedData] = await AsyncStorage.multiGet(['readAloudVoice', 'readAloudSpeed']);
    const voice = voiceData[1] || 'default';
    const speed = parseFloat(speedData[1] || '1.0');

    const response = await fetch('https://tts.qgming.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: text,
        voice: getVoiceName(voice),
        speed: speed,
        pitch: '0',
        style: 'general'
      })
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);
    const audioUri = `data:audio/mpeg;base64,${base64}`;

    currentPlayer = createAudioPlayer({ uri: audioUri });
    currentPlayer.play();
  } catch (error) {
    console.error('朗读失败:', error);
    throw error;
  }
};

export const stopSpeaking = async () => {
  if (currentPlayer) {
    currentPlayer.pause();
  }
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
