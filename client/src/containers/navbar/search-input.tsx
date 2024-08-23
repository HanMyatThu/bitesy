"use client";

// import qs from "query-string";
import { useState } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchInput = () => {
  const [value, setValue] = useState("");

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
      className="relative w-full lg:w-[400px] 2xl:w-[800px] flex items-center"
      onSubmit={onSubmit}
    >
      <Input
        value={value}
        placeholder="Search Delicious Food on Bitesy"
        className="rounded-r-none focus-visible:ring focus-visible:ring-transparent focus-visible:ring-offset-0"
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <X
          onClick={onClear}
          className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer  hover:opacity-70 transition"
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