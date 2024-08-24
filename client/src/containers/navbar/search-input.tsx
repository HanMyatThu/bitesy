"use client";

// import qs from "query-string";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    // const url = qs.stringifyUrl(
    //   {
    //     url: "/search",
    //     query: { term: value },
    //   },
    //   { skipEmptyString: true }
    // );
  };

  const onClear = () => setValue("");

  return (
    <form
      className="relative flex w-full items-center lg:w-[400px] 2xl:w-[800px]"
      onSubmit={onSubmit}
    >
      <Input
        value={value}
        placeholder={t("SEARCH_INPUT_PH")}
        className="rounded-r-none focus-visible:ring focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition hover:opacity-70"
        />
      )}
      <Button
        type="submit"
        size="sm"
        className="rounded-l-none"
        variant="secondary"
      >
        <Search className="size-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
