import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ExternalLink,
  MousePointerClick,
  TrendingUp,
} from "lucide-react"

import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


interface AnalyticsData {
  shortUrl: string
  originalUrl: string
  totalClicks: number
  todayClicks: number
  averageClicks: number
  chartData: {
    date: string
    clicks: number
  }[]
}


function LinkAnalytics() {
  const { id } = useParams()

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null)

  const [isLoading, setIsLoading] = useState(true)


  /*
   * Mock API
   *
   * بعداً:
   * GET /api/links/:id/analytics
   */

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      )

      setAnalytics({
        shortUrl: "shortify.ir/product-123",
        originalUrl:
          "https://example.com/products/123",
        totalClicks: 1248,
        todayClicks: 86,
        averageClicks: 62.4,
        chartData: [
          {
            date: "۱۲ مرداد",
            clicks: 42,
          },
          {
            date: "۱۳ مرداد",
            clicks: 68,
          },
          {
            date: "۱۴ مرداد",
            clicks: 51,
          },
          {
            date: "۱۵ مرداد",
            clicks: 94,
          },
          {
            date: "۱۶ مرداد",
            clicks: 73,
          },
          {
            date: "۱۷ مرداد",
            clicks: 118,
          },
          {
            date: "۱۸ مرداد",
            clicks: 86,
          },
        ],
      })

      setIsLoading(false)
    }

    loadAnalytics()
  }, [id])


  if (isLoading) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="flex min-h-96 items-center justify-center">

            <p className="text-sm text-[var(--muted)]">
              در حال بارگذاری آمار...
            </p>

          </div>

        </div>

      </div>
    )
  }


  if (!analytics) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">

            <h1 className="text-xl font-bold">
              اطلاعاتی پیدا نشد
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              اطلاعات آماری این لینک در دسترس نیست.
            </p>

            <Link
              to="/dashboard/links"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
            >
              <ArrowRight size={16} />
              بازگشت به لینک‌ها
            </Link>

          </div>

        </div>

      </div>
    )
  }


  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <Link
            to={`/dashboard/links/${id}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowRight size={16} />
            بازگشت به جزئیات لینک
          </Link>


          <div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              تحلیل لینک
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              عملکرد و آمار بازدید این لینک را بررسی کنید.
            </p>

          </div>

        </div>


        {/* Link Info */}

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">

          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">

              <ExternalLink
                size={17}
                className="text-[var(--primary)]"
              />

              <a
                href={`https://${analytics.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="truncate text-sm font-semibold text-[var(--primary)] hover:underline"
              >
                {analytics.shortUrl}
              </a>

            </div>


            <p
              dir="ltr"
              className="truncate text-xs text-[var(--muted)]"
            >
              {analytics.originalUrl}
            </p>

          </div>

        </section>


        {/* Stats */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  مجموع کلیک‌ها
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {analytics.totalClicks.toLocaleString("fa-IR")}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                <MousePointerClick size={21} />

              </div>

            </div>

          </div>


          {/* Today */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  کلیک امروز
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {analytics.todayClicks.toLocaleString("fa-IR")}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-500">

                <TrendingUp size={21} />

              </div>

            </div>

          </div>


          {/* Average */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  میانگین روزانه
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {analytics.averageClicks.toLocaleString(
                    "fa-IR",
                    {
                      maximumFractionDigits: 1,
                    }
                  )}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--muted)]">

                <BarChart3 size={21} />

              </div>

            </div>

          </div>

        </div>


        {/* Chart */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <BarChart3
                  size={18}
                  className="text-[var(--primary)]"
                />

                <h2 className="font-bold">
                  تعداد کلیک‌ها
                </h2>

              </div>

              <p className="mt-1 text-xs text-[var(--muted)]">
                آمار کلیک‌های ۷ روز اخیر
              </p>

            </div>


            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">

              <CalendarDays size={14} />

              ۷ روز اخیر

            </div>

          </div>


          <div className="h-80 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={analytics.chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 0,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />

                <XAxis
                  dataKey="date"
                  tick={{
                    fill: "var(--muted)",
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "var(--muted)",
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  cursor={{
                    fill: "var(--background)",
                  }}
                  contentStyle={{
                    backgroundColor:
                      "var(--surface)",
                    border:
                      "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                  }}
                  formatter={(value) => [
                    `${value} کلیک`,
                    "کلیک",
                  ]}
                />

                <Bar
                  dataKey="clicks"
                  fill="var(--primary)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={42}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </section>


        {/* Coming Soon Details */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <h2 className="font-bold">
            جزئیات بیشتر
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            در نسخه بعدی می‌توانیم اطلاعات دقیق‌تری مانند
            موقعیت جغرافیایی، دستگاه، مرورگر و سیستم‌عامل
            کاربران را به این بخش اضافه کنیم.
          </p>


          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <p className="text-xs text-[var(--muted)]">
                کشور
              </p>

              <p className="mt-2 text-sm font-semibold">
                ایران
              </p>

            </div>


            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <p className="text-xs text-[var(--muted)]">
                دستگاه
              </p>

              <p className="mt-2 text-sm font-semibold">
                Desktop
              </p>

            </div>


            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <p className="text-xs text-[var(--muted)]">
                مرورگر
              </p>

              <p className="mt-2 text-sm font-semibold">
                Chrome
              </p>

            </div>


            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <p className="text-xs text-[var(--muted)]">
                سیستم‌عامل
              </p>

              <p className="mt-2 text-sm font-semibold">
                Windows
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default LinkAnalytics