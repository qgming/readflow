import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('readflow.db');

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      url TEXT,
      content TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now'))
    );
  `);
};

export const saveBookmark = (title: string, url?: string, content?: string) => {
  db.runSync('INSERT INTO bookmarks (title, url, content) VALUES (?, ?, ?)', [title, url || '', content || '']);
};

export const getBookmarks = () => {
  return db.getAllSync('SELECT * FROM bookmarks ORDER BY created_at DESC');
};

export const deleteBookmark = (id: number) => {
  db.runSync('DELETE FROM bookmarks WHERE id = ?', [id]);
};

export default db;
