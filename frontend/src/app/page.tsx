//app frontend/src/app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-400 px-6">
      <div className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_#000] px-10 py-12 max-w-lg w-full text-center">

        <h1 className="text-4xl font-black mb-3 tracking-tight text-black uppercase">
          App Académica de Tareas
        </h1>

        <div className="h-2 bg-black w-24 mx-auto mb-6" />

        <p className="text-black font-medium leading-relaxed mb-8 text-sm">
          Aplicación full stack desarrollada con{" "}
          <span className="bg-yellow-400 px-1 font-black">Next.js</span>,{" "}
          <span className="bg-yellow-400 px-1 font-black">Flask</span>,{" "}
          <span className="bg-yellow-400 px-1 font-black">PostgreSQL</span> y{" "}
          <span className="bg-yellow-400 px-1 font-black">Docker</span>.
        </p>

        
          <a href="/tasks"
          className="inline-block px-8 py-3 bg-black text-yellow-400 font-black text-sm uppercase border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors shadow-[4px_4px_0px_0px_#555]"
        >
          Ver tareas →
        </a>

        <div className="mt-8 pt-5 border-t-4 border-black text-xs text-black font-bold uppercase">
          Desarrollo de Aplicaciones Web Avanzadas · Universidad de Guayaquil
        </div>
      </div>
    </main>
  );
}