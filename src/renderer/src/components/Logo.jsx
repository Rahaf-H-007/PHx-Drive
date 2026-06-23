export default function Logo() {
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.2)] mx-auto"
      style={{ background: 'linear-gradient(145deg, #a31515 0%, #7b0f0f 100%)' }}
    >
      <span
        className="text-white text-2xl font-bold tracking-tight select-none"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Px
      </span>
    </div>
  )
}
