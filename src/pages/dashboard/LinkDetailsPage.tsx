import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  MousePointerClick,
  Pencil,
  Trash2,
} from "lucide-react"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


interface LinkDetailsData {
  id: number
  shortUrl: string
  originalUrl: string
  title: string
  clicks: number
  status: "active" | "expired"
  createdAt: string
  expiresAt: string
  customSlug: string
}


function LinkDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [link, setLink] = useState<LinkDetailsData | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [copied, setCopied] = useState(false)


  /*
   * Mock API
   *
   * بعداً این بخش با:
   * GET /api/links/:id
   * جایگزین می‌شود.
   */

  useEffect(() => {
    const loadLink = async () => {
      setIsLoading(true)

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      )

      setLink({
        id: Number(id),
        shortUrl: "shortify.ir/product-123",
        originalUrl: "https://example.com/products/123",
        title: "صفحه محصول",
        clicks: 1248,
        status: "active",
        createdAt: "۱۲ مرداد ۱۴۰۵",
        expiresAt: "بدون تاریخ انقضا",
        customSlug: "product-123",
      })

      setIsLoading(false)
    }

    loadLink()
  }, [id])


  const handleCopy = async () => {
    if (!link) {
      return
    }

    try {
      await navigator.clipboard.writeText(
        `https://${link.shortUrl}`
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }


  const handleDelete = () => {
    if (!link) {
      return
    }

    const confirmed = window.confirm(
      `آیا از حذف لینک «${link.shortUrl}» مطمئن هستید؟`
    )

    if (!confirmed) {
      return
    }

    // Mock Delete API
    console.log("Delete Link:", link.id)

    navigate("/dashboard/links")
  }


  if (isLoading) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="flex min-h-96 items-center justify-center">

            <p className="text-sm text-[var(--muted)]">
              در حال بارگذاری اطلاعات لینک...
            </p>

          </div>

        </div>

      </div>
    )
  }


  if (!link) {
    return (
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 text-center">

            <h1 className="text-xl font-bold">
              لینک پیدا نشد
            </h1>

            <p className="mt-2 text-sm text-[var(--muted)]">
              لینک مورد نظر وجود ندارد یا حذف شده است.
            </p>

            <Link
              to="/dashboard/links"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
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

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">

          <Link
            to="/dashboard/links"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowRight size={16} />
            بازگشت به لینک‌های من
          </Link>


          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-2xl font-bold sm:text-3xl">
                {link.title || "جزئیات لینک"}
              </h1>

              <p className="mt-2 text-sm text-[var(--muted)]">
                مشاهده اطلاعات و آمار لینک
              </p>

            </div>


            <div className="flex items-center gap-2">

              <Link
                to={`/dashboard/links/${link.id}/edit`}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-4 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
              >
                <Pencil size={15} />
                ویرایش
              </Link>


              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-500/20 px-4 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
              >
                <Trash2 size={15} />
                حذف
              </button>

            </div>

          </div>

        </div>


        {/* Short URL Card */}

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">

              <p className="text-xs text-[var(--muted)]">
                لینک کوتاه
              </p>


              <div className="mt-2 flex items-center gap-3">

                <a
                  href={`https://${link.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="truncate text-lg font-semibold text-[var(--primary)] hover:underline sm:text-xl"
                >
                  {link.shortUrl}
                </a>


                <a
                  href={`https://${link.shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="باز کردن لینک"
                  title="باز کردن لینک"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >
                  <ExternalLink size={17} />
                </a>

              </div>


              <div className="mt-3 flex items-center gap-2">

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                >

                  {copied ? (
                    <>
                      <Check size={14} />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      کپی لینک
                    </>
                  )}

                </button>

              </div>

            </div>


            {/* Status */}

            <div className="shrink-0">

              {link.status === "active" ? (

                <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-500">

                  <span className="h-2 w-2 rounded-full bg-green-500" />

                  فعال

                </span>

              ) : (

                <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-500">

                  <span className="h-2 w-2 rounded-full bg-orange-500" />

                  منقضی

                </span>

              )}

            </div>

          </div>

        </section>


        {/* Original URL */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <p className="text-xs text-[var(--muted)]">
            لینک مقصد
          </p>


          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="mt-2 block truncate text-sm text-[var(--foreground)] transition-colors hover:text-[var(--primary)] hover:underline"
          >
            {link.originalUrl}
          </a>

        </section>


        {/* Stats */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Clicks */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  تعداد کلیک
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {link.clicks.toLocaleString("fa-IR")}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                <MousePointerClick size={21} />

              </div>

            </div>

          </div>


          {/* Created */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  تاریخ ایجاد
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {link.createdAt}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--muted)]">

                <CalendarDays size={21} />

              </div>

            </div>

          </div>


          {/* Expiration */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  انقضا
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {link.expiresAt}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--background)] text-[var(--muted)]">

                <CalendarDays size={21} />

              </div>

            </div>

          </div>

        </div>


        {/* Analytics CTA */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <BarChart3
                  size={19}
                  className="text-[var(--primary)]"
                />

                <h2 className="font-bold">
                  تحلیل عملکرد لینک
                </h2>

              </div>


              <p className="mt-2 text-sm text-[var(--muted)]">
                جزئیات کامل کلیک‌ها، بازدیدها و عملکرد این لینک را مشاهده کنید.
              </p>

            </div>


            <Link
              to={`/dashboard/links/${link.id}/analytics`}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
            >
              مشاهده آمار
              <BarChart3 size={16} />
            </Link>

          </div>

        </section>

      </div>

    </div>
  )
}

export default LinkDetails