import {
  ChevronLeft,
  Copy,
  ExternalLink,
  Link2,
  MousePointerClick,
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
  is_active: boolean
  created_at: string
}

interface LinksResponse {
  items: LinkItem[]
}

function RecentLinks() {
  const navigate = useNavigate()

  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRecentLinks = async () => {
      try {
        setLoading(true)
        setError("")

        const token = Cookies.get("access_token")

        if (!token) {
          navigate("/login")
          return
        }

        const response = await fetch(
          `${API_BASE_URL}/api/v1/links?page=1&limit=4&sort=newest`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include'
          }
        )

        const data: LinksResponse & { detail?: string } =
          await response.json()

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

    fetchRecentLinks()
  }, [navigate])

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
  }

  return (
    <section className="rounded-2xl border border-(--border) bg-(--surface)">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-(--border) p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div>

          <h2 className="font-bold">
            آخرین لینک‌ها
          </h2>

          <p className="mt-1 text-xs text-(--muted)">
            آخرین لینک‌های ایجاد شده توسط شما
          </p>

        </div>

        {!loading && !error && links.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/dashboard/links")}
            className="flex items-center gap-2 text-xs font-medium text-(--primary) cursor-pointer"
          >
            مشاهده همه

            <ChevronLeft size={14} />
          </button>
        )}

      </div>


      {loading && (
        <div className="p-8 text-center text-xs text-(--muted)">
          در حال دریافت لینک‌ها...
        </div>
      )}


      {!loading && error && (
        <div className="p-6">
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-center text-xs text-red-500">
            {error}
          </p>
        </div>
      )}


      {!loading && !error && links.length === 0 && (
        <div className="p-8 text-center text-xs text-(--muted)">
          هنوز لینکی ایجاد نکرده‌اید.
        </div>
      )}


      {!loading && !error && links.length > 0 && (
        <>
          {/* Desktop Table */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full text-right">

              <thead>

                <tr className="border-b border-(--border) text-xs text-(--muted)">

                  <th className="px-6 py-4 font-medium">
                    لینک
                  </th>

                  <th className="px-6 py-4 font-medium">
                    کلیک‌ها
                  </th>

                  <th className="px-6 py-4 font-medium">
                    وضعیت
                  </th>

                  <th className="px-6 py-4 font-medium">
                    ایجاد شده
                  </th>

                  <th className="px-6 py-4" />

                </tr>

              </thead>


              <tbody>

                {links.map((link) => (

                  <tr
                    key={link.id}
                    className="border-b border-(--border) last:border-0 transition-colors hover:bg-(--background)/50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)">

                          <Link2 size={17} />

                        </div>

                        <div className="min-w-0">

                          <p
                            dir="ltr"
                            className="truncate text-right text-sm font-medium"
                          >
                            {link.short_url}
                          </p>

                          <p
                            dir="ltr"
                            className="mt-1 max-w-xs truncate text-right text-xs text-(--muted)"
                          >
                            {link.original_url}
                          </p>

                        </div>

                      </div>

                    </td>


                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2 text-sm">

                        <MousePointerClick
                          size={15}
                          className="text-(--muted)"
                        />

                        {link.clicks.toLocaleString("fa-IR")}

                      </div>

                    </td>


                    <td className="px-6 py-4">

                      {link.is_active ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-500">

                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                          فعال

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-500">

                          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                          منقضی

                        </span>

                      )}

                    </td>


                    <td className="px-6 py-4 text-sm text-(--muted)">
                      {formatDate(link.created_at)}
                    </td>


                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-1">

                        <button
                          type="button"
                          onClick={() =>
                            copyLink(link.short_url)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                          aria-label="کپی لینک"
                        >
                          <Copy size={15} />
                        </button>

                        <a
                          href={link.short_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                          aria-label="مشاهده لینک"
                        >
                          <ExternalLink size={15} />
                        </a>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>


          {/* Mobile List */}

          <div className="divide-y divide-(--border) md:hidden">

            {links.map((link) => (

              <div
                key={link.id}
                className="p-5"
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">

                    <Link2 size={18} />

                  </div>


                  <div className="min-w-0 flex-1">

                    <p
                      dir="ltr"
                      className="truncate text-right text-sm font-semibold"
                    >
                      {link.short_url}
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 truncate text-right text-xs text-(--muted)"
                    >
                      {link.original_url}
                    </p>


                    <div className="mt-3 flex items-center gap-4">

                      <span className="flex items-center gap-1.5 text-xs text-(--muted)">

                        <MousePointerClick size={13} />

                        {link.clicks.toLocaleString("fa-IR")} کلیک

                      </span>


                      <span className="text-xs text-(--muted)">
                        {formatDate(link.created_at)}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </>
      )}

    </section>
  )
}

export default RecentLinks