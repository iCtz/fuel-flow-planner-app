
import { LocalizedString } from "@/types/hierarchy";
import { useLanguage } from "@/contexts/LanguageContext";
import i18n from "@/i18n";

// Helper function to get string value from potentially localized content
export const getLocalizedString = (
  text: string | LocalizedString | undefined, 
  lang: string = 'en'
): string => {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang as keyof LocalizedString] || text.en || '';
};

// React hook to use localized strings based on current language
export const useLocalizedString = () => {
  const { currentLanguage } = useLanguage();
  
  return (text: string | LocalizedString | undefined): string => {
    return getLocalizedString(text, currentLanguage);
  };
};

// Function to use when rendering inside components that can't handle complex types
export const renderLocalizedString = (text: string | LocalizedString | undefined): string => {
  const currentLang = i18n.language || 'en';
  return getLocalizedString(text, currentLang);
};

// Helper to handle string operations safely on LocalizedString
export const safeStringOperation = (
  text: string | LocalizedString | undefined,
  operation: (str: string) => string
): string => {
  const stringValue = renderLocalizedString(text);
  return operation(stringValue);
};
