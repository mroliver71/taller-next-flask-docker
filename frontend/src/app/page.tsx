import { ArrowRight } from 'lucide-react';

export default function Home() {
  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 8 + Math.random() * 18,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 5,
    drift: Math.random() > 0.5 ? 1 : -1,
  }));

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-[#F5F0E8] px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <svg
            key={star.id}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `star-twinkle ${star.duration}s ease-in-out infinite, star-drift-${star.drift > 0 ? "right" : "left"} ${star.duration * 1.8}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <path
              d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
              fill="#000"
            />
          </svg>
        ))}
      </div>

      <div className="relative z-10 bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_#000] px-10 py-12 max-w-lg w-full text-center">
        <h1 className="text-4xl font-black mb-3 tracking-tight text-black uppercase">
          App Académica de Tareas
        </h1>

        <div className="h-2 bg-black w-24 mx-auto mb-6" />

        <p className="text-black font-medium leading-relaxed mb-8 text-sm">
          Plataforma de gestión académica para registrar, consultar y
          administrar tareas universitarias en tiempo real.
        </p>

        <a
          href="/tasks"
          className="inline-flex items-center gap-2 px-8 py-3 bg-black text-[#E8C547] font-black text-sm uppercase border-2 border-black hover:bg-[#F5F0E8] hover:text-black transition-colors shadow-[4px_4px_0px_0px_#555]"
          >
          Ver tareas <ArrowRight size={14} />
        </a>

        <div className="mt-8 pt-5 border-t-4 border-black text-xs text-black font-bold uppercase">
          Desarrollo de Aplicaciones Web Avanzadas · Universidad de Guayaquil
        </div>
      </div>

      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(15deg); }
        }
        @keyframes star-drift-right {
          0% { translate: 0px 0px; }
          50% { translate: 15px -10px; }
          100% { translate: 0px 0px; }
        }
        @keyframes star-drift-left {
          0% { translate: 0px 0px; }
          50% { translate: -15px 10px; }
          100% { translate: 0px 0px; }
        }
      `}</style>
    </main>
  );
}