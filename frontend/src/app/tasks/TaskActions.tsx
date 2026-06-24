"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, } from "lucide-react";



type TaskActionsProps = {
  taskId: number;
  currentStatus: string;
};

const STATUS_OPTIONS = ["PENDIENTE", "EN PROCESO", "COMPLETADA"];

export default function TaskActions({ taskId, currentStatus }: TaskActionsProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Error al actualizar estado");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el estado de la tarea.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm("¿Seguro que deseas eliminar esta tarea?");
    if (!confirmed) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar tarea");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={currentStatus}
        disabled={loading}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="border-2 border-black text-xs px-2 py-1.5 bg-white font-bold text-black shadow-[2px_2px_0px_0px_#000] disabled:opacity-50"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-black uppercase bg-red-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}