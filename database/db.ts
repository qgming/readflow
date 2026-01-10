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

export default db;
