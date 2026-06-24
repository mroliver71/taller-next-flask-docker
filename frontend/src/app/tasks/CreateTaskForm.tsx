"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    if (!title.trim()) {
      alert("El título es obligatorio.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: "PENDIENTE" }),
      });
      if (!response.ok) throw new Error("Error al crear tarea");
      setTitle("");
      setDescription("");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-black text-yellow-400 font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_0px_#555] hover:bg-yellow-400 hover:text-black transition-colors"
      >
        + Nueva tarea
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 border-2 border-black p-3 bg-yellow-50 shadow-[3px_3px_0px_0px_#000] w-full">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        className="border-2 border-black text-sm px-3 py-2 bg-white text-black placeholder:text-gray-500 font-medium flex-1 focus:outline-none shadow-[2px_2px_0px_0px_#000] disabled:opacity-50"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        className="border-2 border-black text-sm px-3 py-2 bg-white text-black placeholder:text-gray-500 font-medium flex-1 focus:outline-none shadow-[2px_2px_0px_0px_#000] disabled:opacity-50"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-black text-yellow-400 font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_#555] hover:bg-yellow-400 hover:text-black transition-colors disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
        <button
          onClick={() => setOpen(false)}
          disabled={loading}
          className="px-4 py-2 bg-white text-black font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_#555] hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}