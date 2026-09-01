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

import Cookies from "js-cookie"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


interface AnalyticsBreakdownItem {
  name: string
  clicks: number
}


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

  countries: AnalyticsBreakdownItem[]
  devices: AnalyticsBreakdownItem[]
  browsers: AnalyticsBreakdownItem[]
  operatingSystems: AnalyticsBreakdownItem[]
}


interface AnalyticsApiResponse {
  short_url: string
  original_url: string

  total_clicks: number
  today_clicks: number
  average_clicks: number

  chart_data: {
    date: string
    clicks: number
  }[]

  countries: AnalyticsBreakdownItem[]
  devices: AnalyticsBreakdownItem[]
  browsers: AnalyticsBreakdownItem[]
  operating_systems: AnalyticsBreakdownItem[]
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const formatPersianDate = (dateString: string) => {
  if (!dateString) {
    return "-"
  }

  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date)
}


function LinkAnalytics() {
  const { id } = useParams()

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState("")


  useEffect(() => {
    const loadAnalytics = async () => {
      if (!id) {
        setError("شناسه لینک نامعتبر است.")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError("")

        const token = Cookies.get("access_token")

        if (!token) {
          throw new Error(
            "برای مشاهده آمار لینک باید وارد حساب کاربری شوید."
          )
        }


        const response = await fetch(
          `${API_BASE_URL}/api/v1/links/${id}/analytics`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        )


        let data: AnalyticsApiResponse | null = null

        try {
          data = await response.json()
        } catch {
          data = null
        }


        if (!response.ok) {
          throw new Error(
            data && "detail" in data
              ? String(
                  (data as unknown as {
                    detail: string
                  }).detail
                )
              : "دریافت آمار لینک با خطا مواجه شد."
          )
        }


        if (!data) {
          throw new Error(
            "اطلاعات آماری لینک دریافت نشد."
          )
        }


        setAnalytics({
          shortUrl: data.short_url,
          originalUrl: data.original_url,

          totalClicks: data.total_clicks,
          todayClicks: data.today_clicks,
          averageClicks: data.average_clicks,

          chartData: data.chart_data,

          countries: data.countries,
          devices: data.devices,
          browsers: data.browsers,
          operatingSystems:
            data.operating_systems,
        })

      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(
            "خطایی در دریافت آمار لینک رخ داد."
          )
        }

        setAnalytics(null)
      } finally {
        setIsLoading(false)
      }
    }


    loadAnalytics()
  }, [id])


  /*
   * Loading
   */

  if (isLoading) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="flex min-h-96 items-center justify-center">

            <p className="text-sm text-(--muted)">
              در حال بارگذاری آمار...
            </p>

          </div>

        </div>

      </div>
    )
  }


  /*
   * Error / No Data
   */

  if (!analytics) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-10 text-center">

            <h1 className="text-xl font-bold">
              اطلاعاتی پیدا نشد
            </h1>

            <p className="mt-2 text-sm text-(--muted)">
              {error ||
                "اطلاعات آماری این لینک در دسترس نیست."}
            </p>

            <Link
              to="/dashboard/links"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white"
            >
              <ArrowRight size={16} />
              بازگشت به لینک‌ها
            </Link>

          </div>

        </div>

      </div>
    )
  }


  /*
   * Render
   */

  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <Link
            to={`/dashboard/links/${id}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-(--muted) transition-colors hover:text-(--foreground)"
          >
            <ArrowRight size={16} />
            بازگشت به جزئیات لینک
          </Link>


          <div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              تحلیل لینک
            </h1>

            <p className="mt-2 text-sm text-(--muted)">
              عملکرد و آمار بازدید این لینک را بررسی کنید.
            </p>

          </div>

        </div>


        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-500">
            {error}
          </div>
        )}


        {/* Link Info */}

        <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-6">

          <div className="flex flex-col gap-3">

            <div className="flex items-center gap-2">

              <ExternalLink
                size={17}
                className="text-(--primary)"
              />

              <a
                href={`https://${analytics.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="truncate text-sm font-semibold text-(--primary) hover:underline"
              >
                {analytics.shortUrl}
              </a>

            </div>


            <p
              dir="ltr"
              title={analytics.originalUrl}
              className="truncate text-xs text-(--muted)"
            >
              {analytics.originalUrl}
            </p>

          </div>

        </section>


        {/* Stats */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Clicks */}

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-(--muted)">
                  مجموع کلیک‌ها
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {analytics.totalClicks.toLocaleString(
                    "fa-IR"
                  )}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">

                <MousePointerClick size={21} />

              </div>

            </div>

          </div>


          {/* Today Clicks */}

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-(--muted)">
                  کلیک امروز
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {analytics.todayClicks.toLocaleString(
                    "fa-IR"
                  )}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-500">

                <TrendingUp size={21} />

              </div>

            </div>

          </div>


          {/* Average */}

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-(--muted)">
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


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--background) text-(--muted)">

                <BarChart3 size={21} />

              </div>

            </div>

          </div>

        </div>


        {/* Chart */}

        <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <BarChart3
                  size={18}
                  className="text-(--primary)"
                />

                <h2 className="font-bold">
                  تعداد کلیک‌ها
                </h2>

              </div>

              <p className="mt-1 text-xs text-(--muted)">
                روند کلی کلیک‌های ثبت‌شده
              </p>

            </div>


            <div className="flex items-center gap-2 text-xs text-(--muted)">

              <CalendarDays size={14} />

              {analytics.chartData.length > 0
                ? `${analytics.chartData.length.toLocaleString(
                    "fa-IR"
                  )} روز`
                : "بدون داده"}

            </div>

          </div>


          {analytics.chartData.length === 0 ? (

            <div className="flex h-80 items-center justify-center">

              <p className="text-sm text-(--muted)">
                هنوز کلیکی برای این لینک ثبت نشده است.
              </p>

            </div>

          ) : (

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
                    tickFormatter={(value) =>
                      formatPersianDate(String(value))
                    }
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
                    labelFormatter={(value) =>
                      formatPersianDate(String(value))
                    }
                    contentStyle={{
                      backgroundColor:
                        "var(--surface)",
                      border:
                        "1px solid var(--border)",
                      borderRadius: "12px",
                      color: "var(--foreground)",
                    }}
                    formatter={(value) => [
                      `${Number(value).toLocaleString(
                        "fa-IR"
                      )} کلیک`,
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

          )}

        </section>


        {/* Detailed Analytics */}

        <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

          <div>

            <h2 className="font-bold">
              جزئیات بازدید
            </h2>

            <p className="mt-2 text-sm text-(--muted)">
              اطلاعات ثبت‌شده درباره کشور، دستگاه، مرورگر و سیستم‌عامل کاربران.
            </p>

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Countries */}

            <AnalyticsBreakdown
              title="کشور"
              items={analytics.countries}
            />


            {/* Devices */}

            <AnalyticsBreakdown
              title="دستگاه"
              items={analytics.devices}
            />


            {/* Browsers */}

            <AnalyticsBreakdown
              title="مرورگر"
              items={analytics.browsers}
            />


            {/* Operating Systems */}

            <AnalyticsBreakdown
              title="سیستم‌عامل"
              items={analytics.operatingSystems}
            />

          </div>

        </section>

      </div>

    </div>
  )
}


/*
 * Breakdown Component
 */

interface AnalyticsBreakdownProps {
  title: string
  items: AnalyticsBreakdownItem[]
}


function AnalyticsBreakdown({
  title,
  items,
}: AnalyticsBreakdownProps) {
  return (
    <div className="rounded-xl border border-(--border) bg-(--background) p-4">

      <p className="text-xs text-(--muted)">
        {title}
      </p>


      {items.length === 0 ? (

        <p className="mt-3 text-sm text-(--muted)">
          اطلاعاتی ثبت نشده
        </p>

      ) : (

        <div className="mt-3 space-y-2">

          {items.map((item) => (

            <div
              key={`${item.name}-${item.clicks}`}
              className="flex items-center justify-between gap-3"
            >

              <span className="truncate text-sm font-semibold">
                {item.name}
              </span>

              <span className="shrink-0 text-xs text-(--muted)">
                {item.clicks.toLocaleString("fa-IR")} کلیک
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}


export default LinkAnalytics