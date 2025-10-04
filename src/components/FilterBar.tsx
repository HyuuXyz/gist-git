import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  selectedLanguage: string | null;
  onLanguageSelect: (language: string | null) => void;
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "CSS",
  "HTML",
  "SQL",
  "Shell",
];

export const FilterBar = ({ selectedLanguage, onLanguageSelect }: FilterBarProps) => {
  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Filter by:
          </span>
          <Button
            variant={selectedLanguage === null ? "default" : "outline"}
            size="sm"
            onClick={() => onLanguageSelect(null)}
            className="h-8"
          >
            All
          </Button>
          {LANGUAGES.map((lang) => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? "default" : "outline"}
              size="sm"
              onClick={() => onLanguageSelect(lang)}
              className="h-8"
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
