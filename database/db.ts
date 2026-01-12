import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('readflow.db');

export interface Bookmark {
  id: number;
  title: string;
  url?: string;
  content?: string;
  created_at: number;
  translation?: string;
  language?: string;
}

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT,
      content TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now')),
      translation TEXT
    );
  `);

  try {
    db.execSync(`ALTER TABLE bookmarks ADD COLUMN translation TEXT;`);
  } catch {
    // Column already exists
  }
};

export const saveBookmark = (title: string, url?: string, content?: string) => {
  db.runSync('INSERT INTO bookmarks (title, url, content) VALUES (?, ?, ?)', [title, url || '', content || '']);
};

export const getBookmarks = () => {
  return db.getAllSync('SELECT * FROM bookmarks ORDER BY created_at DESC');
};

export const getBookmarkById = (id: number): Bookmark | null => {
  return db.getFirstSync('SELECT * FROM bookmarks WHERE id = ?', [id]) as Bookmark | null;
};

export const deleteBookmark = (id: number) => {
  db.runSync('DELETE FROM bookmarks WHERE id = ?', [id]);
};

export const updateTranslation = (id: number, translation: string) => {
  db.runSync('UPDATE bookmarks SET translation = ? WHERE id = ?', [translation, id]);
};

export interface VocabularyWord {
  id: number;
  word: string;
  created_at: number;
}

export const initVocabulary = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS vocabulary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL UNIQUE,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    );
  `);
};

export const addToVocabulary = (word: string) => {
  db.runSync('INSERT OR IGNORE INTO vocabulary (word) VALUES (?)', [word]);
};

export const removeFromVocabulary = (word: string) => {
  db.runSync('DELETE FROM vocabulary WHERE word = ?', [word]);
};

export const isInVocabulary = (word: string): boolean => {
  const result = db.getFirstSync('SELECT 1 FROM vocabulary WHERE word = ?', [word]);
  return !!result;
};

export const getVocabulary = (): VocabularyWord[] => {
  return db.getAllSync('SELECT * FROM vocabulary ORDER BY created_at DESC') as VocabularyWord[];
};

export default db;
