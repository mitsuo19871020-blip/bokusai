export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,30,58,0.06),_transparent_70%)] pointer-events-none" />
      <span className="absolute text-white/3 text-[200px] font-serif select-none pointer-events-none leading-none">
        休
      </span>

      <div className="relative z-10 text-center max-w-md">
        <p className="text-red-500 text-xs tracking-widest uppercase mb-6">Maintenance</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Under Maintenance
        </h1>
        <p className="text-white/40 text-base leading-relaxed mb-2">
          bokusai is currently undergoing scheduled maintenance.
        </p>
        <p className="text-white/30 text-sm leading-relaxed mb-10">
          We'll be back shortly. Thank you for your patience.
        </p>
        <p className="text-white/15 text-xs font-serif tracking-widest">— 墨彩 —</p>
      </div>
    </main>
  )
}
