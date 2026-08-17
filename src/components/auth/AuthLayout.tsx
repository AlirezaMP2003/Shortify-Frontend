import { Link } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

      </div>


      {/* Header */}

      <header className="relative z-10">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-white">
              S
            </div>

            <span className="text-xl font-bold">
              Shortify
            </span>

          </Link>


          {/* Theme */}

          <button
            type="button"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
            aria-label="تغییر حالت نمایش"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

        </div>

      </header>


      {/* Content */}

      <main className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-12">

        {children}

      </main>

    </div>
  )
}

export default AuthLayout