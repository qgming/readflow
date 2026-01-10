export type LanguageCode = 'BG' | 'ZH' | 'CS' | 'DA' | 'NL' | 'EN' | 'ET' | 'FI' | 'FR' | 'DE' | 'EL' | 'HU' | 'IT' | 'JA' | 'LV' | 'LT' | 'PL' | 'PT' | 'RO' | 'RU' | 'SK' | 'SL' | 'ES' | 'SV' | 'UK' | 'auto';

export const SUPPORTED_LANGUAGES: Record<string, { name: string; nativeName: string }> = {
  BG: { name: 'Bulgarian', nativeName: 'Български' },
  ZH: { name: 'Chinese', nativeName: '中文' },
  CS: { name: 'Czech', nativeName: 'Česky' },
  DA: { name: 'Danish', nativeName: 'Dansk' },
  NL: { name: 'Dutch', nativeName: 'Nederlands' },
  EN: { name: 'English', nativeName: 'English' },
  ET: { name: 'Estonian', nativeName: 'Eesti' },
  FI: { name: 'Finnish', nativeName: 'Suomi' },
  FR: { name: 'French', nativeName: 'Français' },
  DE: { name: 'German', nativeName: 'Deutsch' },
  EL: { name: 'Greek', nativeName: 'Ελληνικά' },
  HU: { name: 'Hungarian', nativeName: 'Magyar' },
  IT: { name: 'Italian', nativeName: 'Italiano' },
  JA: { name: 'Japanese', nativeName: '日本語' },
  LV: { name: 'Latvian', nativeName: 'Latviešu' },
  LT: { name: 'Lithuanian', nativeName: 'Lietuvių' },
  PL: { name: 'Polish', nativeName: 'Polski' },
  PT: { name: 'Portuguese', nativeName: 'Português' },
  RO: { name: 'Romanian', nativeName: 'Română' },
  RU: { name: 'Russian', nativeName: 'Русский' },
  SK: { name: 'Slovak', nativeName: 'Slovenčina' },
  SL: { name: 'Slovenian', nativeName: 'Slovenščina' },
  ES: { name: 'Spanish', nativeName: 'Español' },
  SV: { name: 'Swedish', nativeName: 'Svenska' },
  UK: { name: 'Ukrainian', nativeName: 'Українська Мова' },
};

export interface TranslationRequest {
  text: string;
  target_lang: string;
  source_lang?: string;
}

export interface TranslationService {
  translate(request: TranslationRequest): Promise<string>;
  testConnection(): Promise<boolean>;
  isLanguageSupported(langCode: string): boolean;
  updateConfig(): void;
}
