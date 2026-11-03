"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "cn";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { categories } from "@/lib/constants";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "All") params.delete(key);
    else params.set(key, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // wait a little after typing before searching
  useEffect(() => {
    const current = searchParams.get("search") || "";
    if (search === current) return;
    const id = setTimeout(() => updateParam("search", search.trim()), 450);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by studio name or location..."
            className="h-11 rounded-full pl-10"
            aria-label="Search studios"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <NativeSelect
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="h-11 w-full rounded-full sm:w-52"
          aria-label="Sort studios"
        >
          <NativeSelectOption value="newest">Newest first</NativeSelectOption>
          <NativeSelectOption value="rating">Top rated</NativeSelectOption>
          <NativeSelectOption value="price-asc">Price: low to high</NativeSelectOption>
          <NativeSelectOption value="price-desc">Price: high to low</NativeSelectOption>
        </NativeSelect>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ name: "All", label: "All Studios" }, ...categories].map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => updateParam("category", c.name)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition",
              category === c.name
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
