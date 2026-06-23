export default function LoginHeader() {
  return (
    <div className="text-center mt-4 mb-6">
      <h1
        className="text-[1.75rem] font-semibold tracking-wide text-gray-900"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        PharaonX
      </h1>
      <p
        className="text-xs font-semibold tracking-[0.18em] uppercase mt-0.5"
        style={{ color: '#b31616' }}
      >
        No Limitations
      </p>
      <p className="text-sm text-gray-500 mt-3">
        Sign in to <span className="font-bold text-gray-800">PHx Drive</span>
      </p>
    </div>
  )
}
