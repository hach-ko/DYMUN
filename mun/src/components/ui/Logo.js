// components/Logo.js
export function Logo() {
  return (
    <div className="flex items-center space-x-3 p-4 bg-white/90 rounded-3xl shadow-lg">
      <img src="/dymun-logo.png" alt="DYMUN" className="h-10 w-auto rounded-xl" />
      <span className="text-xl font-bold text-slate-800">DYMUN</span>
    </div>
  );
}