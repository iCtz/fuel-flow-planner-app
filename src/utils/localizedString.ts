
import { LocalizedString } from "@/types/hierarchy";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper function to get string value from potentially localized content
export const getLocalizedString = (
  text: string | LocalizedString | undefined, 
  lang: string = 'en'
): string => {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang as keyof LocalizedString] || text.en || '';
};

// React hook to get localized strings based on current language
export const useLocalizedString = () => {
  const { currentLanguage } = useLanguage();
  
  return (text: string | LocalizedString | undefined): string => {
    return getLocalizedString(text, currentLanguage);
  };
};
