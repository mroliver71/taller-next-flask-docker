import TaskActions from "./TaskActions";
import CreateTaskForm from "./CreateTaskForm";
import SearchBar from "./SearchBar";

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

async function getTasks(query?: string): Promise<Task[]> {
  const url = query
    ? `http://backend:8080/tasks?q=${encodeURIComponent(query)}`
    : "http://backend:8080/tasks";

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Error al consumir el Web Service Flask");
  }

  return response.json();
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const tasks = await getTasks(q);

  return (
    <main className="min-h-screen bg-yellow-400 px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">

        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-black px-8 py-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black">
              Listado de tareas
            </h1>
            <p className="text-black font-medium text-sm mt-1">
              Datos obtenidos en tiempo real desde el backend Flask
            </p>
          </div>
          <a
            href="/"
            className="px-5 py-2.5 bg-black text-yellow-400 font-black text-sm uppercase border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors shadow-[3px_3px_0px_0px_#555]"
          >
            ← Volver
          </a>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start justify-between px-8 py-5 border-b-4 border-black bg-yellow-50">
          <CreateTaskForm />
          <SearchBar defaultValue={q ?? ""} />
        </div>

        {/* Tabla */}
        <table className="w-full text-left border-collapse">
          <thead className="bg-black text-yellow-400">
            <tr>
              <th className="px-5 py-3 text-xs font-black uppercase tracking-widest">ID</th>
              <th className="px-5 py-3 text-xs font-black uppercase tracking-widest">Título</th>
              <th className="px-5 py-3 text-xs font-black uppercase tracking-widest">Descripción</th>
              <th className="px-5 py-3 text-xs font-black uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-black font-bold uppercase">
                  {q ? `No se encontraron tareas para "${q}".` : "No hay tareas registradas todavía."}
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b-2 border-black hover:bg-yellow-50 transition-colors">
                  <td className="px-5 py-4 font-black text-sm text-black">#{task.id}</td>
                  <td className="px-5 py-4 font-bold text-black">{task.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-700 font-medium">{task.description}</td>
                  <td className="px-5 py-4">
                    <TaskActions taskId={task.id} currentStatus={task.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="px-8 py-5 border-t-4 border-black bg-yellow-50 text-center text-xs font-black uppercase text-black">
          Desarrollo de Aplicaciones Web Avanzadas · Universidad de Guayaquil
        </div>
      </div>
    </main>
  );
}