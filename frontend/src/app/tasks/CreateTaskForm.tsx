"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function CreateTaskForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function resetAndClose() {
    setTitle("");
    setDescription("");
    setOpen(false);
  }

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
      resetAndClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-black text-[#E8C547] font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_0px_#555] hover:bg-[#F5F0E8] hover:text-black transition-colors"
      >
        <Plus size={14} />
        Nueva tarea
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => !loading && resetAndClose()}
        >
          <div
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between mb-5 border-b-4 border-black pb-4">
              <h2 className="text-lg font-black uppercase tracking-tight text-black">Nueva tarea</h2>
              <button
                onClick={resetAndClose}
                disabled={loading}
                className="font-black text-black hover:text-red-600 transition-colors disabled:opacity-50 text-lg"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Título *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Investigar Next.js"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  autoFocus
                  className="w-full border-2 border-black text-sm px-3 py-2.5 bg-[#FAF7F2] text-black placeholder:text-gray-500 font-medium focus:outline-none shadow-[2px_2px_0px_0px_#000] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
                  Descripción
                </label>
                <textarea
                  placeholder="Detalles de la tarea..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={3}
                  className="w-full border-2 border-black text-sm px-3 py-2.5 bg-[#FAF7F2] text-black placeholder:text-gray-500 font-medium focus:outline-none shadow-[2px_2px_0px_0px_#000] disabled:opacity-50 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t-2 border-black">
              <button
                onClick={resetAndClose}
                disabled={loading}
                className="px-4 py-2 bg-white text-black font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_#555] hover:bg-[#F5F0E8] transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-black text-[#E8C547] font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0px_0px_#555] hover:bg-[#F5F0E8] hover:text-black transition-colors disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}