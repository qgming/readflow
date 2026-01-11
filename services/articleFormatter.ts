export function formatArticleToParagraphs(content: string): string {
  if (!content) return '';

  return content
    // --- 预处理阶段 ---
    // 移除特定元素
    .replace(/\[time-brightcove not-tgx="true"\]/g, '')
    // 解码 HTML 实体
    .replace(/&aring;/g, 'å')
    .replace(/&[a-zA-Z]+;/g, (match) => {
      const entities: Record<string, string> = {
        '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'",
        '&nbsp;': ' ', '&copy;': '©', '&reg;': '®', '&trade;': '™'
      };
      return entities[match] || match;
    })
    // 将所有现有的换行、制表符、连续空格全部压扁成一个半角空格
    .replace(/\s+/g, ' ')

    // --- 核心算法：智能分句 ---
    // 逻辑：寻找 [终结标点 + 引号/括号?]
    // 必须满足：
    // (A) 前面不是缩写模式（大写字母. 或 常见缩写词.）
    // (B) 后面紧跟的是 [大写字母] 或 [中文字符] 或 [文本末尾]
    .replace(
      /(?<![A-Z])([.!?。！？]["'"'」』]?)\s*(?=[A-Z\u4e00-\u9fa5]|$)/g,
      '$1\n'
    )
    .replace(
      /(?<=\b(?:Mr|Ms|Mrs|Dr|Prof|Sr|Jr|vs|approx|etc|vol)\.["'"'」』]?)\n/g,
      ' '
    )

    // --- 格式化清理阶段 ---
    .split('\n')
    .map(line => line.trim())
    // 过滤掉所有空白行，确保"无论原文多少换行都改为一个换行"
    .filter(line => line.length > 0)
    // 重新用单换行符连接
    .join('\n');
}

export function segmentWords(text: string): { text: string; isWord: boolean }[] {
  const segments: { text: string; isWord: boolean }[] = [];
  const regex = /([a-zA-Z]+(?:'[a-zA-Z]+)?)|([^a-zA-Z]+)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    segments.push({
      text: match[0],
      isWord: !!match[1]
    });
  }

  return segments;
}