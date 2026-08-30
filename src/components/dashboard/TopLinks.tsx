import {
  ChevronLeft,
  Link2,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

interface LinkItem {
  id: string
  short_url: string
  original_url: string
  clicks: number
}

interface LinksResponse {
  items: LinkItem[]
}

function TopLinks() {
  const navigate = useNavigate()

  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTopLinks = async () => {
      try {
        setLoading(true)
        setError("")

        const token = Cookies.get("access_token")

        if (!token) {
          navigate("/login")
          return
        }

        const response = await fetch(
          `${API_BASE_URL}/api/v1/links?page=1&limit=4&sort=most-clicked`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.detail || "دریافت لینک‌ها با خطا مواجه شد."
          )
        }

        setLinks(data.items)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("خطایی در دریافت لینک‌ها رخ داد.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTopLinks()
  }, [navigate])

  return (
    <div className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="font-bold">
            محبوب‌ترین لینک‌ها
          </h2>

          <p className="mt-1 text-xs text-(--muted)">
            لینک‌هایی با بیشترین کلیک
          </p>

        </div>

        <Link2
          size={19}
          className="text-(--primary)"
        />

      </div>


      <div className="mt-6 space-y-4">

        {loading && (
          <p className="py-6 text-center text-xs text-(--muted)">
            در حال دریافت لینک‌ها...
          </p>
        )}

        {!loading && error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-xs text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && links.length === 0 && (
          <p className="py-6 text-center text-xs text-(--muted)">
            هنوز لینکی ایجاد نکرده‌اید.
          </p>
        )}

        {!loading &&
          !error &&
          links.map((link, index) => (
            <div
              key={link.id}
              className="flex items-center gap-3"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--background) text-xs font-bold text-(--muted)">
                {index + 1}
              </div>


              <div className="min-w-0 flex-1">

                <p
                  dir="ltr"
                  className="truncate text-right text-sm font-medium"
                >
                  {link.short_url}
                </p>

                <p
                  dir="ltr"
                  className="mt-1 truncate text-right text-xs text-(--muted)"
                >
                  {link.original_url}
                </p>

              </div>


              <div className="shrink-0 text-left">

                <p className="text-sm font-semibold">
                  {link.clicks.toLocaleString("fa-IR")}
                </p>

                <p className="text-[10px] text-(--muted)">
                  کلیک
                </p>

              </div>

            </div>
          ))}

      </div>

      {!loading && !error && links.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/dashboard/links")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-(--border) py-2.5 text-xs font-medium text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground) cursor-pointer"
          >
            مشاهده همه لینک‌ها

            <ChevronLeft size={14} />
          </button>
      )}

      

    </div>
  )
}

export default TopLinks