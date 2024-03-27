"use client";

import { useEffect, useState } from "react";
import { useDebounce, useQueryParams } from "../hooks";
import { Input, Label } from "@/ui";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams();
  const query = queryParams.get("search") ?? "";

  const [stateQuery, setQuery] = useState(query);
  const debouncedQuery = useDebounce(stateQuery);

  useEffect(() => {
    if (query !== debouncedQuery) {
      setQueryParams({
        search: debouncedQuery,
      });
    }
  }, [debouncedQuery, setQueryParams, query]);

  return (
    <div className="max-w-[500px] space-y-2">
      <Label>Search by prompt</Label>
      <Input value={stateQuery} onChange={(e) => setQuery(e.target.value)} />
    </div>
  );
}
