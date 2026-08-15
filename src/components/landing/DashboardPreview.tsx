import {
  BarChart3,
  Link2,
  MousePointerClick,
  TrendingUp,
} from "lucide-react"

function DashboardPreview() {
  return (
    <section className="px-6 pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl">

        {/* Browser / Dashboard Frame */}
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/10">

          {/* Top Bar */}
          <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-5">

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="text-xs text-[var(--muted)]">
              داشبورد Shortify
            </div>

          </div>


          {/* Dashboard */}
          <div className="grid md:grid-cols-[190px_1fr]">

            {/* Sidebar */}
            <aside className="hidden border-l border-[var(--border)] p-5 md:block">

              <div className="mb-8 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-bold text-white">
                  S
                </div>

                <span className="font-bold">
                  Shortify
                </span>

              </div>


              <nav className="space-y-2 text-sm">

                <div className="rounded-xl bg-[var(--primary)] px-3 py-2.5 text-white">
                  داشبورد
                </div>

                <div className="rounded-xl px-3 py-2.5 text-[var(--muted)]">
                  لینک‌های من
                </div>

                <div className="rounded-xl px-3 py-2.5 text-[var(--muted)]">
                  تحلیل‌ها
                </div>

                <div className="rounded-xl px-3 py-2.5 text-[var(--muted)]">
                  API
                </div>

              </nav>

            </aside>


            {/* Main Dashboard */}
            <div className="p-5 sm:p-8">

              {/* Header */}
              <div className="mb-7">

                <h3 className="text-lg font-bold">
                  خلاصه عملکرد
                </h3>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  وضعیت لینک‌های شما در ۳۰ روز گذشته
                </p>

              </div>


              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl border border-[var(--border)] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-[var(--muted)]">
                      تعداد کلیک‌ها
                    </p>

                    <MousePointerClick
                      size={17}
                      className="text-[var(--primary)]"
                    />

                  </div>

                  <p className="mt-3 text-2xl font-bold">
                    12,842
                  </p>

                  <p className="mt-2 text-xs text-green-500">
                    +18.4%
                  </p>

                </div>


                <div className="rounded-2xl border border-[var(--border)] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-[var(--muted)]">
                      لینک‌ها
                    </p>

                    <Link2
                      size={17}
                      className="text-[var(--primary)]"
                    />

                  </div>

                  <p className="mt-3 text-2xl font-bold">
                    1,248
                  </p>

                  <p className="mt-2 text-xs text-[var(--muted)]">
                    لینک فعال
                  </p>

                </div>


                <div className="rounded-2xl border border-[var(--border)] p-4">

                  <div className="flex items-center justify-between">

                    <p className="text-xs text-[var(--muted)]">
                      نرخ رشد
                    </p>

                    <TrendingUp
                      size={17}
                      className="text-green-500"
                    />

                  </div>

                  <p className="mt-3 text-2xl font-bold">
                    24.8%
                  </p>

                  <p className="mt-2 text-xs text-green-500">
                    این ماه
                  </p>

                </div>

              </div>


              {/* Chart */}
              <div className="mt-5 rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-semibold">
                      تعداد کلیک‌ها
                    </p>

                    <p className="mt-1 text-xs text-[var(--muted)]">
                      عملکرد لینک‌ها در روزهای اخیر
                    </p>

                  </div>

                  <BarChart3
                    size={19}
                    className="text-[var(--primary)]"
                  />

                </div>


                <div className="mt-8 flex h-32 items-end gap-2">

                  {[35, 48, 40, 62, 52, 70, 63, 82, 68, 94, 76, 100].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-[var(--primary)]/60 transition-colors hover:bg-[var(--primary)]"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}

                </div>

              </div>


              {/* Recent Links */}
              <div className="mt-5 rounded-2xl border border-[var(--border)]">

                <div className="border-b border-[var(--border)] px-5 py-4">

                  <p className="text-sm font-semibold">
                    لینک‌های اخیر
                  </p>

                </div>


                <div className="divide-y divide-[var(--border)]">

                  <div className="flex items-center justify-between gap-4 px-5 py-4">

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium">
                        sho.rt/a8K92x
                      </p>

                      <p className="mt-1 truncate text-xs text-[var(--muted)]">
                        example.com/product
                      </p>

                    </div>

                    <span className="shrink-0 text-xs text-[var(--muted)]">
                      1,245 کلیک
                    </span>

                  </div>


                  <div className="flex items-center justify-between gap-4 px-5 py-4">

                    <div className="min-w-0">

                      <p className="truncate text-sm font-medium">
                        sho.rt/X7kP92
                      </p>

                      <p className="mt-1 truncate text-xs text-[var(--muted)]">
                        example.com/article
                      </p>

                    </div>

                    <span className="shrink-0 text-xs text-[var(--muted)]">
                      842 کلیک
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default DashboardPreview