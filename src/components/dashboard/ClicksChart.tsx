import { BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface DashboardChartItem {
  date: string
  clicks: number
}

interface DashboardOverviewResponse {
  clicks_last_7_days: DashboardChartItem[]
}

interface ChartDataItem {
  day: string
  clicks: number
}

function ClicksChart() {
  const navigate = useNavigate()

  const [clickData, setClickData] =
    useState<ChartDataItem[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchClicksData = async () => {
      try {
        setLoading(true)
        setError("")

        const token = Cookies.get("access_token")

        if (!token) {
          navigate("/login")
          return
        }

        const response = await fetch(
          `${API_BASE_URL}/api/v1/dashboard/overview`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.detail ||
              "دریافت اطلاعات نمودار با خطا مواجه شد."
          )
        }

        const chartData: ChartDataItem[] =
          data.clicks_last_7_days.map(
            (item: DashboardChartItem) => {
              const date = new Date(
                `${item.date}T00:00:00`
              )

              const day = new Intl.DateTimeFormat("fa-IR", {
                weekday: "long",
              }).format(date)

              return {
                day,
                clicks: item.clicks,
              }
            }
          )

        setClickData(chartData)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("خطایی در دریافت اطلاعات نمودار رخ داد.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchClicksData()
  }, [navigate])

  return (
    <div className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="font-bold">
            تعداد کلیک‌ها
          </h2>

          <p className="mt-1 text-xs text-(--muted)">
            عملکرد لینک‌ها در ۷ روز گذشته
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">
          <BarChart3 size={19} />
        </div>

      </div>

      <div className="mt-8 h-64 w-full">

        {loading && (
          <div className="flex h-full items-center justify-center text-sm text-(--muted)">
            در حال دریافت اطلاعات...
          </div>
        )}

        {!loading && error && (
          <div className="flex h-full items-center justify-center">
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-xs text-red-500">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={clickData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="clickGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="var(--primary)"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--muted)",
                  fontSize: 11,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--muted)",
                  fontSize: 11,
                }}
                width={40}
              />

              <Tooltip
                cursor={{
                  stroke: "var(--primary)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  boxShadow:
                    "0 10px 30px rgba(0, 0, 0, 0.08)",
                  direction: "rtl",
                }}
                labelStyle={{
                  color: "var(--foreground)",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "var(--primary)",
                }}
                formatter={(value) => [
                  `${Number(value).toLocaleString("fa-IR")} کلیک`,
                  "تعداد",
                ]}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="var(--primary)"
                strokeWidth={3}
                fill="url(#clickGradient)"
                activeDot={{
                  r: 6,
                  strokeWidth: 3,
                  stroke: "var(--surface)",
                }}
              />

            </AreaChart>

          </ResponsiveContainer>
        )}

      </div>

    </div>
  )
}

export default ClicksChart