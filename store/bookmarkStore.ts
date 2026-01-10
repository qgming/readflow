import { create } from 'zustand';
import { getBookmarks, saveBookmark as dbSaveBookmark, deleteBookmark as dbDeleteBookmark } from '../database/db';

interface Bookmark {
  id: number;
  title: string;
  url: string;
  content: string;
  created_at: number;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  loadBookmarks: () => void;
  addBookmark: (title: string, url?: string, content?: string) => void;
  removeBookmark: (id: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  loadBookmarks: () => {
    const data = getBookmarks() as Bookmark[];
    set({ bookmarks: data });
  },
  addBookmark: (title, url, content) => {
    dbSaveBookmark(title, url, content);
    const data = getBookmarks() as Bookmark[];
    set({ bookmarks: data });
  },
  removeBookmark: (id) => {
    dbDeleteBookmark(id);
    const data = getBookmarks() as Bookmark[];
    set({ bookmarks: data });
  },
}));
