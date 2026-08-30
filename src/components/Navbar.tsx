import { Link } from "react-router-dom"
import { useTheme } from ".././contexts/ThemeContext"
import { useAuth } from ".././contexts/AuthContext"

function Navbar() {
  const { theme, setTheme } = useTheme()
  const { loading, isAuthenticated } = useAuth()

  return ( 
    
    <header className="sticky top-0 z-50 border-b border-(--border) bg-(--background)/80 backdrop-blur-xl"> 
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary) text-white">
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
            className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
          >
            امکانات
          </a>

          <a
            href="#analytics"
            className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
          >
            تحلیل‌ها
          </a>

          <a
            href="#api"
            className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
          >
            API
          </a>

          <a
            href="#about"
            className="text-sm text-(--muted) transition-colors hover:text-(--foreground)"
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) text-(--muted) transition-colors hover:bg-(--surface-hover) hover:text-(--foreground)"
            aria-label="تغییر حالت نمایش"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>


          {/* Auth Actions */}

          {loading ? null : isAuthenticated ? (

            <Link
              to="/dashboard"
              className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
            >
              حساب کاربری
            </Link>

          ) : (

            <>
              {/* Login */}

              <Link
                to="/login"
                className="hidden px-3 py-2 text-sm font-medium text-(--muted) transition-colors hover:text-(--foreground) sm:block"
              >
                ورود
              </Link>


              {/* CTA */}

              <Link
                to="/register"
                className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-(--primary-hover)"
              >
                شروع کنید
              </Link>
            </>

          )}

        </div>

      </div>
    </header>
  )
}

export default Navbar