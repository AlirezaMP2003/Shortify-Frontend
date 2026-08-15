import { Link, Outlet } from "react-router-dom"

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex h-16 items-center justify-between px-6">

          <Link
            to="/dashboard"
            className="text-xl font-bold"
          >
            Shortify
          </Link>

          <div className="text-sm text-[var(--muted)]">
            کاربر
          </div>

        </div>
      </header>


      <div className="flex">

        {/* Sidebar */}
        <aside className="min-h-[calc(100vh-4rem)] w-64 border-l border-[var(--border)] bg-[var(--surface)] p-4">

          <nav className="space-y-1">

            <Link
              to="/dashboard"
              className="block rounded-lg px-4 py-3 hover:bg-[var(--surface-hover)]"
            >
              داشبورد
            </Link>

            <Link
              to="/dashboard/links"
              className="block rounded-lg px-4 py-3 hover:bg-[var(--surface-hover)]"
            >
              لینک‌های من
            </Link>

            <Link
              to="/dashboard/links/new"
              className="block rounded-lg px-4 py-3 hover:bg-[var(--surface-hover)]"
            >
              ساخت لینک
            </Link>

            <Link
              to="/dashboard/api"
              className="block rounded-lg px-4 py-3 hover:bg-[var(--surface-hover)]"
            >
              API
            </Link>

            <Link
              to="/dashboard/settings"
              className="block rounded-lg px-4 py-3 hover:bg-[var(--surface-hover)]"
            >
              تنظیمات
            </Link>

          </nav>

        </aside>


        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout