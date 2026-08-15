import {
  ArrowUpLeft,
  BarChart3,
  Globe2,
  MousePointerClick,
  Smartphone,
} from "lucide-react"

function AnalyticsSection() {
  const bars = [35, 48, 42, 61, 54, 72, 67, 82, 76, 91, 84, 100]

  return (
    <section
      id="analytics"
      className="scroll-mt-24 px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <BarChart3 size={27} />
          </div>

          <span className="mt-7 block text-sm font-semibold text-[var(--primary)]">
            تحلیل و آمار
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            بدانید لینک‌هایتان چه عملکردی دارند
          </h2>

          <p className="mt-5 leading-8 text-[var(--muted)]">
            اطلاعات مهم مربوط به لینک‌ها را در یک داشبورد
            حرفه‌ای مشاهده کنید و رفتار کاربران را بهتر بشناسید.
          </p>

        </div>


        {/* Analytics Dashboard */}

        <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xl shadow-black/5">

          {/* Dashboard Header */}

          <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

            <div>

              <h3 className="font-bold">
                آمار لینک‌ها
              </h3>

              <p className="mt-1 text-xs text-[var(--muted)]">
                گزارش عملکرد در ۳۰ روز گذشته
              </p>

            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            >
              ۳۰ روز گذشته

              <ArrowUpLeft size={14} />
            </button>

          </div>


          <div className="p-5 sm:p-6">

            {/* Stats */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-[var(--muted)]">
                    کل کلیک‌ها
                  </span>

                  <MousePointerClick
                    size={18}
                    className="text-[var(--primary)]"
                  />

                </div>

                <p className="mt-4 text-2xl font-bold">
                  24,892
                </p>

                <p className="mt-2 text-xs text-green-500">
                  +18.4% نسبت به ماه قبل
                </p>

              </div>


              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-[var(--muted)]">
                    کاربران
                  </span>

                  <Globe2
                    size={18}
                    className="text-[var(--primary)]"
                  />

                </div>

                <p className="mt-4 text-2xl font-bold">
                  8,421
                </p>

                <p className="mt-2 text-xs text-green-500">
                  +12.7%
                </p>

              </div>


              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-[var(--muted)]">
                    دستگاه‌ها
                  </span>

                  <Smartphone
                    size={18}
                    className="text-[var(--primary)]"
                  />

                </div>

                <p className="mt-4 text-2xl font-bold">
                  63%
                </p>

                <p className="mt-2 text-xs text-[var(--muted)]">
                  موبایل
                </p>

              </div>


              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-[var(--muted)]">
                    نرخ کلیک
                  </span>

                  <BarChart3
                    size={18}
                    className="text-[var(--primary)]"
                  />

                </div>

                <p className="mt-4 text-2xl font-bold">
                  7.8%
                </p>

                <p className="mt-2 text-xs text-green-500">
                  +2.1%
                </p>

              </div>

            </div>


            {/* Chart */}

            <div className="mt-5 rounded-2xl border border-[var(--border)] p-5 sm:p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="text-sm font-semibold">
                    روند کلیک‌ها
                  </h4>

                  <p className="mt-1 text-xs text-[var(--muted)]">
                    تعداد کلیک‌های روزانه
                  </p>

                </div>

                <span className="text-sm font-bold text-[var(--primary)]">
                  24,892
                </span>

              </div>


              {/* Chart */}

              <div className="mt-8 flex h-52 items-end gap-2 sm:gap-3">

                {bars.map((height, index) => (
                  <div
                    key={index}
                    className="group relative flex h-full flex-1 items-end"
                  >

                    <div
                      className="w-full rounded-t-lg bg-[var(--primary)]/60 transition-all duration-300 group-hover:bg-[var(--primary)]"
                      style={{
                        height: `${height}%`,
                      }}
                    />

                  </div>
                ))}

              </div>


              {/* Chart Labels */}

              <div className="mt-3 flex justify-between text-[10px] text-[var(--muted)]">

                <span>۱ تیر</span>
                <span>۷ تیر</span>
                <span>۱۴ تیر</span>
                <span>۲۱ تیر</span>
                <span>۳۰ تیر</span>

              </div>

            </div>


            {/* Bottom Analytics */}

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              {/* Countries */}

              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center gap-2">

                  <Globe2
                    size={18}
                    className="text-[var(--primary)]"
                  />

                  <h4 className="text-sm font-semibold">
                    موقعیت کاربران
                  </h4>

                </div>


                <div className="mt-5 space-y-4">

                  {[
                    ["ایران", "54%"],
                    ["آلمان", "18%"],
                    ["آمریکا", "12%"],
                    ["سایر", "16%"],
                  ].map(([country, percentage]) => (
                    <div key={country}>

                      <div className="mb-2 flex items-center justify-between text-xs">

                        <span>
                          {country}
                        </span>

                        <span className="text-[var(--muted)]">
                          {percentage}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">

                        <div
                          className="h-full rounded-full bg-[var(--primary)]"
                          style={{
                            width: percentage,
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>


              {/* Devices */}

              <div className="rounded-2xl border border-[var(--border)] p-5">

                <div className="flex items-center gap-2">

                  <Smartphone
                    size={18}
                    className="text-[var(--primary)]"
                  />

                  <h4 className="text-sm font-semibold">
                    دستگاه کاربران
                  </h4>

                </div>


                <div className="mt-5 space-y-4">

                  {[
                    ["موبایل", "63%"],
                    ["دسکتاپ", "29%"],
                    ["تبلت", "8%"],
                  ].map(([device, percentage]) => (
                    <div key={device}>

                      <div className="mb-2 flex items-center justify-between text-xs">

                        <span>
                          {device}
                        </span>

                        <span className="text-[var(--muted)]">
                          {percentage}
                        </span>

                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">

                        <div
                          className="h-full rounded-full bg-[var(--primary)]"
                          style={{
                            width: percentage,
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default AnalyticsSection