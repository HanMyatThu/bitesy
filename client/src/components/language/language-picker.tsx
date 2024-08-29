import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface ILanguage {
  key: string;
  value: string;
}

export function LanguagePicker() {
  const { i18n, t } = useTranslation();

  const currentLanguage: string = i18n.language || "en";

  const languages: ILanguage[] = [
    {
      key: "en",
      value: "ENGLISH",
    },
    {
      key: "nl",
      value: "DUTCH",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{currentLanguage.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24" align="center" forceMount>
        <DropdownMenuGroup>
          {languages.map((language: ILanguage) => (
            <DropdownMenuItem
              key={language.key}
              className="justify-left"
              onClick={() => i18n.changeLanguage(language.key)}
            >
              <span className="text-xs 2xl:text-sm">{t(language.value)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
