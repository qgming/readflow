import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ecdictService } from '@/services/ecdict';

interface WordLibraryStore {
  enabledLibraries: Set<string>;
  libraryWordSets: Map<string, Set<string>>;
  loadLibraries: () => Promise<void>;
  toggleLibrary: (tag: string) => Promise<void>;
  isWordInLibrary: (word: string) => string | null;
}

export const useWordLibraryStore = create<WordLibraryStore>((set, get) => ({
  enabledLibraries: new Set(),
  libraryWordSets: new Map(),

  loadLibraries: async () => {
    try {
      const stored = await AsyncStorage.getItem('enabledWordLibraries');
      const enabled = stored ? new Set<string>(JSON.parse(stored)) : new Set<string>();
      set({ enabledLibraries: enabled });

      for (const tag of enabled) {
        const words = await ecdictService.getWordsByTag(tag);
        get().libraryWordSets.set(tag, new Set(words));
      }
    } catch (error) {
      console.error('加载单词库失败:', error);
    }
  },

  toggleLibrary: async (tag: string) => {
    const { enabledLibraries, libraryWordSets } = get();
    const newEnabled = new Set(enabledLibraries);

    if (newEnabled.has(tag)) {
      newEnabled.delete(tag);
      libraryWordSets.delete(tag);
    } else {
      newEnabled.add(tag);
      const words = await ecdictService.getWordsByTag(tag);
      libraryWordSets.set(tag, new Set(words));
    }

    await AsyncStorage.setItem('enabledWordLibraries', JSON.stringify([...newEnabled]));
    set({ enabledLibraries: newEnabled, libraryWordSets: new Map(libraryWordSets) });
  },

  isWordInLibrary: (word: string) => {
    const { enabledLibraries, libraryWordSets } = get();
    const lowerWord = word.toLowerCase();

    for (const tag of enabledLibraries) {
      const wordSet = libraryWordSets.get(tag);
      if (wordSet?.has(lowerWord)) return tag;
    }
    return null;
  },
}));
