import {
  CheckCircle2,
  Clock3,
  Link2,
  MousePointerClick,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface DashboardOverviewResponse {
  total_links: number
  total_clicks: number
  active_links: number
  expired_links: number
}

interface Stat {
  title: string
  value: number
  description: string
  icon: typeof Link2
}

function StatsGrid() {
  const navigate = useNavigate()

  const [stats, setStats] =
    useState<DashboardOverviewResponse | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchDashboardOverview = async () => {
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
              "دریافت اطلاعات داشبورد با خطا مواجه شد."
          )
        }

        setStats(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("خطایی در دریافت اطلاعات داشبورد رخ داد.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardOverview()
  }, [navigate])

  const statItems: Stat[] = [
    {
      title: "کل لینک‌ها",
      value: stats?.total_links ?? 0,
      description: "تعداد کل لینک‌های شما",
      icon: Link2,
    },
    {
      title: "کل کلیک‌ها",
      value: stats?.total_clicks ?? 0,
      description: "تعداد کل کلیک‌ها",
      icon: MousePointerClick,
    },
    {
      title: "لینک‌های فعال",
      value: stats?.active_links ?? 0,
      description: "در حال استفاده",
      icon: CheckCircle2,
    },
    {
      title: "لینک‌های منقضی",
      value: stats?.expired_links ?? 0,
      description: "منقضی شده",
      icon: Clock3,
    },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {loading && (
        <div className="col-span-full rounded-2xl border border-(--border) bg-(--surface) p-6 text-center text-sm text-(--muted)">
          در حال دریافت اطلاعات...
        </div>
      )}

      {!loading && error && (
        <div className="col-span-full rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-500">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        statItems.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-(--border) bg-(--surface) p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-(--muted)">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-2xl font-bold">
                    {stat.value.toLocaleString("fa-IR")}
                  </p>

                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">
                  <Icon size={20} />
                </div>

              </div>

              <div className="mt-5">
                <span className="text-xs text-(--muted)">
                  {stat.description}
                </span>
              </div>

            </div>
          )
        })}

    </section>
  )
}

export default StatsGrid