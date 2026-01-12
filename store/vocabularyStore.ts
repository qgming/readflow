import { create } from 'zustand';
import { addToVocabulary, removeFromVocabulary, isInVocabulary, getVocabulary } from '@/database/db';

interface VocabularyStore {
  vocabularySet: Set<string>;
  loadVocabulary: () => void;
  isWordInVocabulary: (word: string) => boolean;
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
}

export const useVocabularyStore = create<VocabularyStore>((set, get) => ({
  vocabularySet: new Set(),

  loadVocabulary: () => {
    const words = getVocabulary();
    const wordSet = new Set(words.map(w => w.word.toLowerCase()));
    set({ vocabularySet: wordSet });
  },

  isWordInVocabulary: (word: string) => {
    return get().vocabularySet.has(word.toLowerCase());
  },

  addWord: (word: string) => {
    addToVocabulary(word);
    set(state => {
      const newSet = new Set(state.vocabularySet);
      newSet.add(word.toLowerCase());
      return { vocabularySet: newSet };
    });
  },

  removeWord: (word: string) => {
    removeFromVocabulary(word);
    set(state => {
      const newSet = new Set(state.vocabularySet);
      newSet.delete(word.toLowerCase());
      return { vocabularySet: newSet };
    });
  },
}));
