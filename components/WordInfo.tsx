import { ECDICTWord } from '@/services/ecdict';
import { useSystemColorScheme, useThemeColors } from '@/store/themeStore';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

interface WordInfoProps {
  wordData: ECDICTWord | null;
  loading: boolean;
}

export default function WordInfo({ wordData, loading }: WordInfoProps) {
  useSystemColorScheme();
  const { colors } = useThemeColors();

  const tagMapping: { [key: string]: string } = {
    'zk': '中考', 'gk': '高考', 'cet4': '四级', 'cet6': '六级',
    'ky': '考研', 'toefl': '托福', 'ielts': '雅思', 'gre': 'GRE'
  };

  const renderTags = () => {
    if (!wordData?.tag) return null;
    const tags = wordData.tag.split(' ').filter(t => t).map(t => tagMapping[t] || t);
    if (tags.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>考试信息</Text>
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: colors.border }]}>
              <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderFrequency = () => {
    const hasData = wordData?.collins || wordData?.oxford !== '0' || wordData?.bnc || wordData?.frq;
    if (!hasData) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>词汇信息</Text>
        <View style={styles.frequencyRow}>
          {wordData?.collins && (
            <View style={[styles.frequencyItem, { backgroundColor: colors.border }]}>
              <Text style={[styles.frequencyLabel, { color: colors.text, opacity: 0.7 }]}>柯林斯星级</Text>
              <Text style={[styles.frequencyValue, { color: colors.text }]}>{'⭐'.repeat(parseInt(wordData.collins) || 0)}</Text>
            </View>
          )}
          {wordData?.oxford !== '0' && (
            <View style={[styles.frequencyItem, { backgroundColor: colors.border }]}>
              <Text style={[styles.frequencyLabel, { color: colors.text, opacity: 0.7 }]}>牛津3000</Text>
              <Text style={[styles.frequencyValue, { color: colors.text }]}>✓</Text>
            </View>
          )}
          {wordData?.bnc && (
            <View style={[styles.frequencyItem, { backgroundColor: colors.border }]}>
              <Text style={[styles.frequencyLabel, { color: colors.text, opacity: 0.7 }]}>BNC词频</Text>
              <Text style={[styles.frequencyValue, { color: colors.text }]}>#{wordData.bnc}</Text>
            </View>
          )}
          {wordData?.frq && (
            <View style={[styles.frequencyItem, { backgroundColor: colors.border }]}>
              <Text style={[styles.frequencyLabel, { color: colors.text, opacity: 0.7 }]}>当代词频</Text>
              <Text style={[styles.frequencyValue, { color: colors.text }]}>#{wordData.frq}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderExchange = () => {
    if (!wordData?.exchange) return null;
    const exchangeMap: { [key: string]: string } = {
      'p': '过去式', 'd': '过去分词', 'i': '现在分词', '3': '第三人称单数',
      'r': '比较级', 't': '最高级', 's': '复数', '0': '原形', '1': '变形'
    };
    const exchanges = wordData.exchange.split('/').filter(ex => ex.trim()).map(ex => {
      const [type, word] = ex.split(':');
      return { type: exchangeMap[type] || type, word };
    });
    if (exchanges.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>词形变化</Text>
        <View style={styles.exchangeRow}>
          {exchanges.map((item, index) => (
            <View key={index} style={[styles.exchangeItem, { backgroundColor: colors.border }]}>
              <Text style={[styles.exchangeType, { color: colors.text, opacity: 0.7 }]}>{item.type}</Text>
              <Text style={[styles.exchangeWord, { color: colors.text }]}>{item.word}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.text} style={styles.loader} />
      ) : wordData ? (
        <>
          {wordData.phonetic && (
            <Text style={[styles.phonetic, { color: colors.text }]}>/{wordData.phonetic}/</Text>
          )}
          {wordData.translation && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>释义</Text>
              {wordData.translation.split('\\n').map((line, index) => (
                <Text key={index} style={[styles.sectionContent, { color: colors.text }]}>{line}</Text>
              ))}
            </View>
          )}
          {renderTags()}
          {renderFrequency()}
          {renderExchange()}
          {wordData.definition && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>定义</Text>
              {wordData.definition.split('\\n').map((line, index) => (
                <Text key={index} style={[styles.sectionContent, { color: colors.text }]}>{line}</Text>
              ))}
            </View>
          )}
        </>
      ) : (
        <Text style={[styles.noData, { color: colors.text }]}>未找到该单词</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 2,
  },
  loader: {
    marginTop: 40,
  },
  phonetic: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.7,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.5,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
  },
  frequencyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  frequencyItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  frequencyLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  frequencyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  exchangeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exchangeItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  exchangeType: {
    fontSize: 11,
    marginBottom: 2,
  },
  exchangeWord: {
    fontSize: 14,
    fontWeight: '600',
  },
});
