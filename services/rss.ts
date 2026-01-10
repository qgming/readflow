import { XMLParser } from 'fast-xml-parser';

export interface RSSItem {
  title: string;
  time: string;
  link?: string;
  description?: string;
}

export async function fetchRSS(url: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(url);
    const xml = await response.text();

    const parser = new XMLParser();
    const result = parser.parse(xml);

    const items = result?.rss?.channel?.item || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    const articles: RSSItem[] = itemsArray.map((item: any) => ({
      title: item.title || '',
      time: formatDate(item.pubDate || ''),
      link: item.link || '',
      description: item.description || '',
    }));

    return articles;
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}
