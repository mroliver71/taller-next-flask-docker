"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ defaultValue }: { defaultValue: string }) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/tasks?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-2 border-black px-3 py-2 text-sm font-medium bg-white text-black placeholder:text-gray-500 focus:outline-none shadow-[2px_2px_0px_0px_#000] w-48"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-yellow-400 font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_#555] hover:bg-yellow-400 hover:text-black transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}