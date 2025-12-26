import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const changeLanguage = (langCode: string, dir: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', langCode);
  };

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <Languages className="h-4 w-4" />
          <span className="text-xs font-medium uppercase">{currentLanguage.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code, lang.dir)}
            className={currentLang === lang.code ? 'bg-accent' : ''}
          >
            <span className={lang.dir === 'rtl' ? 'font-arabic' : ''}>
              {lang.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
