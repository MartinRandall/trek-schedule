import { Header } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-amber-400 font-mono">
      <Header />

      <main className="max-w-7xl mx-auto p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center py-16 sm:py-32 px-4 w-full">
          {/* LCARS decorative bar */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="bg-amber-500 rounded-full h-3 w-12"></div>
            <div className="bg-purple-600 rounded-full h-3 w-8"></div>
            <div className="bg-cyan-500 rounded-full h-3 w-16"></div>
            <div className="bg-amber-500 rounded-full h-3 w-8"></div>
          </div>

          <p className="text-amber-600 text-sm sm:text-base tracking-widest mb-4">
            TRANSMISSION ENDED • STARDATE 2026.03
          </p>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-amber-400 mb-6">
            THE VOYAGE HAS CONCLUDED
          </h2>

          <div className="max-w-xl mx-auto space-y-4">
            <p className="text-amber-500 text-base sm:text-lg">
              Star Trek: The Cruise IX has come to an end.
            </p>
            <p className="text-amber-400 text-lg sm:text-xl font-bold mt-8">
              We&apos;ll see you next year!
            </p>
          </div>

          <div className="mt-12 text-amber-700 text-xs sm:text-sm tracking-widest">
            LIVE LONG AND PROSPER 🖖
          </div>

          {/* LCARS decorative bar */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="bg-amber-500 rounded-full h-3 w-8"></div>
            <div className="bg-cyan-500 rounded-full h-3 w-16"></div>
            <div className="bg-purple-600 rounded-full h-3 w-8"></div>
            <div className="bg-amber-500 rounded-full h-3 w-12"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
