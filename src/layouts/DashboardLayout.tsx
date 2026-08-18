import {
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "لینک‌های من",
      path: "/dashboard/links",
      icon: Link2,
    },
    {
      title: "ساخت لینک",
      path: "/dashboard/links/new",
      icon: Zap,
    },
    {
      title: "API",
      path: "/dashboard/api",
      icon: BarChart3,
    },
    {
      title: "تنظیمات",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  const isDashboardActive =
    location.pathname === "/dashboard"

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >

      {/* =========================
          Mobile Header
      ========================== */}

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 px-4 backdrop-blur-xl lg:hidden">

        {/* Menu */}

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          aria-label="باز کردن منو"
        >
          <Menu size={20} />
        </button>


        {/* Logo */}

        <NavLink
          to="/dashboard"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-white">
            S
          </div>

          <span className="text-lg font-bold">
            Shortify
          </span>

        </NavLink>


        {/* Theme */}

        <button
          type="button"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
          aria-label="تغییر حالت نمایش"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

      </header>


      {/* =========================
          Mobile Overlay
      ========================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}


      {/* =========================
          Sidebar
      ========================== */}

      <aside
        className={`
          fixed right-0 top-0 z-50 flex h-screen w-72 flex-col
          border-l border-[var(--border)]
          bg-[var(--surface)]
          transition-transform duration-300
          lg:w-64
          ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Sidebar Header */}

        <div className="flex h-20 items-center justify-between border-b border-[var(--border)] px-5">

          <NavLink
            to="/dashboard"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] font-bold text-white">
              S
            </div>

            <span className="text-lg font-bold">
              Shortify
            </span>

          </NavLink>


          {/* Mobile Close */}

          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)] lg:hidden"
            aria-label="بستن منو"
          >
            <X size={20} />
          </button>

        </div>


        {/* =========================
            Navigation
        ========================== */}

        <nav className="flex-1 overflow-y-auto p-4">

          <p className="mb-3 px-3 text-xs font-medium text-[var(--muted)]">
            منوی اصلی
          </p>


          <div className="space-y-1.5">

            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3 rounded-xl px-3 py-3
                    text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                    }
                    `
                  }
                >

                  {({ isActive }) => (
                    <>
                      <span
                        className={`
                          flex h-9 w-9 items-center justify-center rounded-lg
                          transition-colors
                          ${
                            isActive
                              ? "bg-[var(--primary)]/10"
                              : "bg-transparent"
                          }
                        `}
                      >
                        <Icon size={18} />
                      </span>

                      <span>
                        {item.title}
                      </span>

                      {isActive && (
                        <span className="mr-auto h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                      )}
                    </>
                  )}

                </NavLink>
              )
            })}

          </div>


          {/* Divider */}

          <div className="my-6 border-t border-[var(--border)]" />


          {/* Quick Access */}

          <p className="mb-3 px-3 text-xs font-medium text-[var(--muted)]">
            دسترسی سریع
          </p>

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
          >

            <span className="flex h-9 w-9 items-center justify-center rounded-lg">
              <ExternalLink size={18} />
            </span>

            <span>
              مشاهده سایت
            </span>

          </NavLink>

        </nav>


        {/* =========================
            User Section
        ========================== */}

        <div className="border-t border-[var(--border)] p-4">

          {/* User Card */}

          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-[var(--background)] p-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
              ع
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-sm font-semibold">
                کاربر Shortify
              </p>

              <p
                dir="ltr"
                className="truncate text-right text-xs text-[var(--muted)]"
              >
                user@example.com
              </p>

            </div>

          </div>


          {/* Theme */}

          <button
            type="button"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
          >

            <span className="flex h-5 w-5 items-center justify-center">

              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}

            </span>

            <span>
              {theme === "dark"
                ? "حالت روشن"
                : "حالت تاریک"}
            </span>

          </button>


          {/* Profile */}

          <NavLink
            to="/dashboard/settings"
            onClick={closeMobileMenu}
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
          >

            <span className="flex h-5 w-5 items-center justify-center">
              <User size={18} />
            </span>

            <span>
              حساب کاربری
            </span>

          </NavLink>


          {/* Logout */}

          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition-colors hover:bg-red-500/10"
          >

            <span className="flex h-5 w-5 items-center justify-center">
              <LogOut size={18} />
            </span>

            <span>
              خروج از حساب
            </span>

          </button>

        </div>

      </aside>


      {/* =========================
          Desktop Main Content
      ========================== */}

      <main className="min-h-screen lg:mr-64">

        {/* Desktop Header */}

        <header className="sticky top-0 z-30 hidden h-20 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/90 px-6 backdrop-blur-xl lg:flex">

          <div>

            <p className="text-sm text-[var(--muted)]">
              {isDashboardActive
                ? "خوش آمدید 👋"
                : "پنل مدیریت Shortify"}
            </p>

          </div>


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

              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}

            </button>


            {/* User */}

            <div className="flex items-center gap-3 border-r border-[var(--border)] pr-4">

              <div className="text-left">

                <p className="text-sm font-semibold">
                  کاربر Shortify
                </p>

                <p className="text-xs text-[var(--muted)]">
                  حساب کاربری
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-sm font-bold text-[var(--primary)]">
                ع
              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}

        <div className="pt-16 lg:pt-0">

          <Outlet />

        </div>

      </main>

    </div>
  )
}

export default DashboardLayout