export function formatArticleToParagraphs(content: string): string {
  if (!content) return '';

  // 1. 建立常见缩写库，防止 U.S. Mr. 等被错误断句
  const abbreviations = [
    'Mr', 'Ms', 'Mrs', 'Dr', 'Prof', 'Sr', 'Jr', 'vs', 'e.g', 'i.e', 
    'U.S', 'U.K', 'U.N', 'B.A', 'M.A', 'Ph.D', 'approx', 'etc', 'vol'
  ];
  const abbrPattern = abbreviations.map(a => a.replace(/\./g, '\\.')).join('|');

  return content
    // --- 预处理阶段 ---
    // 将所有现有的换行、制表符、连续空格全部压扁成一个半角空格
    .replace(/\s+/g, ' ')
    
    // --- 核心算法：智能分句 ---
    // 逻辑：寻找 [终结标点 + 引号/括号?]
    // 必须满足：
    // (A) 前面不是已知的英文缩写 (?<!...)
    // (B) 后面紧跟的是 [大写字母] 或 [中文字符] 或 [文本末尾] (?=[A-Z\u4e00-\u9fa5]|$)
    .replace(
      new RegExp(`(?<!\\b(${abbrPattern}))([.!?。！？]["'”’」』]?)\\s*(?=[A-Z\\u4e00-\\u9fa5]|$)`, 'g'),
      '$2\n'
    )

    // --- 格式化清理阶段 ---
    .split('\n')
    .map(line => line.trim())
    // 过滤掉所有空白行，确保“无论原文多少换行都改为一个换行”
    .filter(line => line.length > 0)
    // 重新用单换行符连接
    .join('\n');
}