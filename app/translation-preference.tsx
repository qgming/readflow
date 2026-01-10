import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Globe, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SelectDrawer } from '../components/SelectDrawer';
import { useTheme } from '../contexts/Theme';

const LANGUAGES = {
  BG: { name: 'Bulgarian', nativeName: 'Български' },
  ZH: { name: 'Chinese', nativeName: '中文' },
  CS: { name: 'Czech', nativeName: 'Česky' },
  DA: { name: 'Danish', nativeName: 'Dansk' },
  NL: { name: 'Dutch', nativeName: 'Nederlands' },
  EN: { name: 'English', nativeName: 'English' },
  ET: { name: 'Estonian', nativeName: 'Eesti' },
  FI: { name: 'Finnish', nativeName: 'Suomi' },
  FR: { name: 'French', nativeName: 'Français' },
  DE: { name: 'German', nativeName: 'Deutsch' },
  EL: { name: 'Greek', nativeName: 'Ελληνικά' },
  HU: { name: 'Hungarian', nativeName: 'Magyar' },
  IT: { name: 'Italian', nativeName: 'Italiano' },
  JA: { name: 'Japanese', nativeName: '日本語' },
  LV: { name: 'Latvian', nativeName: 'Latviešu' },
  LT: { name: 'Lithuanian', nativeName: 'Lietuvių' },
  PL: { name: 'Polish', nativeName: 'Polski' },
  PT: { name: 'Portuguese', nativeName: 'Português' },
  RO: { name: 'Romanian', nativeName: 'Română' },
  RU: { name: 'Russian', nativeName: 'Русский' },
  SK: { name: 'Slovak', nativeName: 'Slovenčina' },
  SL: { name: 'Slovenian', nativeName: 'Slovenščina' },
  ES: { name: 'Spanish', nativeName: 'Español' },
  SV: { name: 'Swedish', nativeName: 'Svenska' },
  UK: { name: 'Ukrainian', nativeName: 'Українська Мова' },
};

export default function TranslationPreferenceScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [languageDrawerVisible, setLanguageDrawerVisible] = useState(false);
  const [engineDrawerVisible, setEngineDrawerVisible] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('ZH');
  const [translationEngine, setTranslationEngine] = useState('bing');

  useEffect(() => {
    AsyncStorage.multiGet(['targetLanguage', 'translationEngine']).then(([lang, engine]) => {
      if (lang[1]) setTargetLanguage(lang[1]);
      if (engine[1]) setTranslationEngine(engine[1]);
    });
  }, []);

  const handleLanguageChange = (lang: string) => {
    setTargetLanguage(lang);
    AsyncStorage.setItem('targetLanguage', lang);
  };

  const handleEngineChange = (engine: string) => {
    setTranslationEngine(engine);
    AsyncStorage.setItem('translationEngine', engine);
  };

  const languageOptions = Object.entries(LANGUAGES).map(([key, value]) => ({
    key,
    label: value.nativeName,
  }));

  const engineOptions = [
    { key: 'google', label: 'Google翻译' },
    { key: 'bing', label: 'Bing翻译' },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable style={[styles.backButton, { backgroundColor: colors.card }]} onPress={() => router.back()}>
          <ChevronLeft color={colors.text} size={28} />
        </Pressable>
        <View style={[styles.titleCapsule, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>翻译偏好</Text>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]} onPress={() => setLanguageDrawerVisible(true)}>
            <Globe size={24} color={colors.textSecondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>目标语言</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {LANGUAGES[targetLanguage as keyof typeof LANGUAGES].nativeName}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingCard, { backgroundColor: colors.card }]} onPress={() => setEngineDrawerVisible(true)}>
            <Zap size={24} color={colors.textSecondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>翻译引擎</Text>
            <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
              {engineOptions.find(opt => opt.key === translationEngine)?.label}
            </Text>
          </TouchableOpacity>
        </View>

        <SelectDrawer
          visible={languageDrawerVisible}
          onClose={() => setLanguageDrawerVisible(false)}
          items={languageOptions}
          selectedKey={targetLanguage}
          onSelect={handleLanguageChange}
          title="选择目标语言"
        />

        <SelectDrawer
          visible={engineDrawerVisible}
          onClose={() => setEngineDrawerVisible(false)}
          items={engineOptions}
          selectedKey={translationEngine}
          onSelect={handleEngineChange}
          title="选择翻译引擎"
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
