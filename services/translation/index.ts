import AsyncStorage from '@react-native-async-storage/async-storage';
import { BingTranslationService } from './bing';
import { GoogleTranslationService } from './google';
import { TranslationService, TranslationRequest } from './types';

export * from './types';

class TranslationServiceManager {
  private bingService: BingTranslationService;
  private googleService: GoogleTranslationService;

  constructor() {
    this.bingService = new BingTranslationService();
    this.googleService = new GoogleTranslationService();
  }

  private async getService(): Promise<TranslationService> {
    const engine = await AsyncStorage.getItem('translationEngine');

    switch (engine) {
      case 'bing':
        return this.bingService;
      case 'google':
        return this.googleService;
      default:
        return this.googleService;
    }
  }

  async translate(text: string, sourceLang?: string): Promise<string> {
    const [service, targetLang] = await Promise.all([
      this.getService(),
      AsyncStorage.getItem('targetLanguage')
    ]);

    const request: TranslationRequest = {
      text,
      target_lang: targetLang || 'ZH',
      source_lang: sourceLang || 'auto'
    };

    return service.translate(request);
  }

  async testConnection(): Promise<boolean> {
    const service = await this.getService();
    return service.testConnection();
  }
}

export const translationService = new TranslationServiceManager();
