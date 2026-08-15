import { Link } from "react-router-dom"
import { useTheme } from ".././contexts/ThemeContext"

function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
            S
          </div>

          <span className="text-xl font-bold">
            Shortify
          </span>
        </Link>


        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            امکانات
          </a>

          <a
            href="#analytics"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            تحلیل‌ها
          </a>

          <a
            href="#api"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            API
          </a>

          <a
            href="#about"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            درباره ما
          </a>

        </nav>


        {/* Actions */}
        <div className="flex items-center gap-3">

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


          {/* Language */}
          <button
            type="button"
            className="hidden h-10 rounded-xl border border-[var(--border)] px-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)] md:block"
          >
            EN
          </button>


          {/* Login */}
          <Link
            to="/login"
            className="hidden px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] sm:block"
          >
            ورود
          </Link>


          {/* CTA */}
          <Link
            to="/register"
            className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
          >
            شروع کنید
          </Link>

        </div>

      </div>
    </header>
  )
}

export default Navbar