import { useTheme } from "./contexts/ThemeContext"

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">
          Shortify
        </h1>

        <p className="mt-4 text-[var(--muted)]">
          کوتاه‌کننده لینک هوشمند
        </p>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-xl font-semibold">
            تست Theme
          </h2>

          <div className="mt-4 flex gap-3">

            <button
              onClick={() => setTheme("light")}
              className="rounded-xl border border-[var(--border)] px-4 py-2"
            >
              روشن
            </button>

            <button
              onClick={() => setTheme("dark")}
              className="rounded-xl border border-[var(--border)] px-4 py-2"
            >
              تاریک
            </button>

            <button
              onClick={() => setTheme("system")}
              className="rounded-xl border border-[var(--border)] px-4 py-2"
            >
              سیستم
            </button>

          </div>

          <p className="mt-4 text-sm text-[var(--muted)]">
            حالت فعلی: {theme}
          </p>

        </div>

      </div>
    </main>
  )
}

export default App
