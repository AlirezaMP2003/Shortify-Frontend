import {
BarChart3,
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
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

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

  const handleLogout = () => {
    logout()
    setShowLogoutModal(false)
    navigate("/", { replace: true })
  }

  const userInitial = user?.name?.trim()
  ? user.name.trim().charAt(0)
  : "؟"

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-(--background) text-(--foreground)"
    >

      {/* =========================
          Mobile Header
      ========================== */}

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border border-(--border) bg-(--background)/90 px-4 backdrop-blur-xl lg:hidden">

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) text-(--muted) transition-colors hover:bg-(--surface-hover) hover:text-(--foreground)"
          aria-label="باز کردن منو"
        >
          <Menu size={20} />
        </button>

        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary) font-bold text-white">
            S
          </div>

          <span className="text-lg font-bold">
            Shortify
          </span>
        </NavLink>

        <div className="w-10" />

      </header>


      {/* =========================
          Overlay
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
          border-l border-(--border)
          bg-(--surface)
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

        <div className="flex h-20 items-center justify-between border-b border-(--border) px-5">

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--primary) font-bold text-white">
              S
            </div>

            <span className="text-lg font-bold">
              Shortify
            </span>
          </NavLink>


          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground) lg:hidden"
            aria-label="بستن منو"
          >
            <X size={20} />
          </button>

        </div>


        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto p-4">

          <p className="mb-3 px-3 text-xs font-medium text-(--muted)">
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
                    flex items-center gap-3 rounded-xl px-3 py-3 text-sm
                    transition-colors
                    ${
                      isActive
                        ? "bg-(--primary)/10 text-(--primary)"
                        : "text-(--muted) hover:bg-(--background) hover:text-(--foreground)"
                    }
                    `
                  }
                >
                  <span className="flex h-5 w-5 items-center justify-center">
                    <Icon size={18} />
                  </span>

                  <span>
                    {item.title}
                  </span>
                </NavLink>
              )
            })}

          </div>

        </nav>


        {/* Sidebar Bottom */}

        <div className="border-t border-(--border) p-4">

          {/* Theme */}

          <button
            type="button"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground) cursor-pointer"
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
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
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
            onClick={() => setShowLogoutModal(true)}
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

        <header className="sticky top-0 z-30 hidden h-20 items-center justify-between border-b border-(--border) bg-(--background)/90 px-6 backdrop-blur-xl lg:flex">

          <div>

            <p className="text-sm text-(--muted)">
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
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) text-(--muted) transition-colors hover:bg-(--surface-hover) hover:text-(--foreground)"
              aria-label="تغییر حالت نمایش"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>


            {/* User */}

            <div className="flex items-center gap-3 border-r border-(--border) pr-4">

              <div className="text-left">

                <p className="text-sm font-semibold">
                  {user?.name || "کاربر"}
                </p>

                <p
                  dir="ltr"
                  className="text-xs text-(--muted)"
                >
                  {user?.email || ""}
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary)/10 text-sm font-bold text-(--primary)">
                {userInitial}
              </div>

            </div>

          </div>

        </header>


        {/* Page Content */}

        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>

      </main>


      {/* =========================
          Logout Confirmation Modal
      ========================== */}

      {showLogoutModal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLogoutModal(false)
            }
          }}
        >

          <div className="w-full max-w-sm rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-2xl">

            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <LogOut size={24} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                خروج از حساب
              </h2>

              <p className="mt-3 text-sm leading-7 text-(--muted)">
                آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
              </p>

            </div>


            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="h-12 flex-1 rounded-xl border border-(--border) text-sm font-medium transition-colors hover:bg-(--surface-hover)"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="h-12 flex-1 rounded-xl bg-red-500 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                خروج از حساب
              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  )
}

export default DashboardLayout