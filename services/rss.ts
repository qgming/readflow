import { XMLParser } from 'fast-xml-parser';

export interface RSSItem {
  title: string;
  time: string;
  link?: string;
  description?: string;
}

function stripHtml(html: string): string {
  const entities: Record<string, string> = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
    '&quot;': '"', '&ldquo;': '"', '&rdquo;': '"',
    '&hellip;': '…', '&mdash;': '—', '&ndash;': '–', '&iacute;': 'í',
    '&rsquo;': "'"
  };

  return html
    .replace(/&[a-z]+;|&#\d+;|&#x[\da-f]+;/gi, m => {
      const lower = m.toLowerCase();
      if (entities[lower]) return entities[lower];
      if (m.startsWith('&#x')) return String.fromCharCode(parseInt(m.slice(3, -1), 16));
      if (m.startsWith('&#')) return String.fromCharCode(parseInt(m.slice(2, -1)));
      return m;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

export async function fetchRSS(url: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(url);
    const xml = await response.text();

    const parser = new XMLParser();
    const result = parser.parse(xml);

    const items = result?.rss?.channel?.item || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    const articles: RSSItem[] = itemsArray.map((item: any) => {
      const htmlContent = item['content:encoded'] || item.description || '';
      const plainText = stripHtml(htmlContent);

      return {
        title: stripHtml(item.title || ''),
        time: formatDate(item.pubDate || ''),
        link: item.link || '',
        description: plainText,
      };
    });

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
