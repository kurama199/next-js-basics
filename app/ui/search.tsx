"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  let timeoutid: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    timeoutid = setTimeout(() => {
      console.log("o/p searching for..... ", searchTerm);
      clearTimeout(timeoutid);
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("query", searchTerm);
      } else {
        params.delete("query");
      }
      replace(`${pathName}?${params.toString()}`);
    }, 300);
    return () => {
      if (timeoutid) {
        clearTimeout(timeoutid);
      }
    };
  }, [searchTerm]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        defaultValue={searchParams?.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
