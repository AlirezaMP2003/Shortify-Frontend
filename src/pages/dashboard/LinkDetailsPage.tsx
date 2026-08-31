import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  MousePointerClick,
  Pencil,
  Trash2,
  X,
} from "lucide-react"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import Cookies from "js-cookie"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


interface LinkDetailsData {
  id: string
  shortUrl: string
  originalUrl: string
  title: string
  clicks: number
  status: "active" | "expired"
  createdAt: string
  expiresAt: string | null
}


/* ---------------------------------------------
   Persian Date
--------------------------------------------- */

const formatPersianDate = (date: string | null) => {
  if (!date) {
    return "بدون تاریخ انقضا"
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    "fa-IR-u-ca-persian",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(parsedDate)
}


function LinkDetails() {

  const { id } = useParams()

  const navigate = useNavigate()


  const [link, setLink] =
    useState<LinkDetailsData | null>(null)


  const [isLoading, setIsLoading] =
    useState(true)


  const [error, setError] =
    useState("")


  const [copied, setCopied] =
    useState(false)


  /* Delete Modal */

  const [showDeleteModal, setShowDeleteModal] =
    useState(false)


  const [deleting, setDeleting] =
    useState(false)


  const [deleteError, setDeleteError] =
    useState("")


  /* ---------------------------------------------
     Load Link
  --------------------------------------------- */

  useEffect(() => {

    const loadLink = async () => {

      if (!id) {
        setError("شناسه لینک معتبر نیست.")
        setIsLoading(false)
        return
      }


      try {

        setIsLoading(true)
        setError("")


        const token =
          Cookies.get("access_token")


        if (!token) {
          throw new Error(
            "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
          )
        }


        const response = await fetch(
          `${API_BASE_URL}/api/v1/links/${id}`,
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
            data?.detail ||
            "دریافت اطلاعات لینک با خطا مواجه شد."
          )

        }


        const mappedLink: LinkDetailsData = {
          id: data.id,
          shortUrl: data.short_url,
          originalUrl: data.original_url,
          title: data.title,
          clicks: data.clicks,
          status:
            data.status === "expired"
              ? "expired"
              : "active",
          createdAt: data.created_at,
          expiresAt: data.expires_at,
        }


        setLink(mappedLink)

      } catch (error) {

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(
            "خطایی در دریافت اطلاعات لینک رخ داد."
          )
        }

        setLink(null)

      } finally {

        setIsLoading(false)

      }

    }


    loadLink()

  }, [id])


  /* ---------------------------------------------
     Copy
  --------------------------------------------- */

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


  /* ---------------------------------------------
     Open Delete Modal
  --------------------------------------------- */

  const handleDelete = () => {

    if (!link) {
      return
    }


    setDeleteError("")
    setShowDeleteModal(true)

  }


  /* ---------------------------------------------
     Close Delete Modal
  --------------------------------------------- */

  const handleCloseDeleteModal = () => {

    if (deleting) {
      return
    }


    setShowDeleteModal(false)
    setDeleteError("")

  }


  /* ---------------------------------------------
     Confirm Delete
  --------------------------------------------- */

  const handleConfirmDelete = async () => {

    if (!link) {
      return
    }


    try {

      setDeleting(true)
      setDeleteError("")


      const token =
        Cookies.get("access_token")


      if (!token) {
        throw new Error(
          "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید."
        )
      }


      const response = await fetch(
        `${API_BASE_URL}/api/v1/links/${link.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          credentials: "include",
        }
      )


      if (!response.ok) {

        const data =
          await response.json().catch(() => null)


        throw new Error(
          data?.detail ||
          "حذف لینک با خطا مواجه شد."
        )

      }


      /*
       * DELETE endpoint returns 204 No Content.
       * Therefore, we don't call response.json().
       */

      setShowDeleteModal(false)

      navigate(
        "/dashboard/links",
        { replace: true }
      )

    } catch (error) {

      if (error instanceof Error) {
        setDeleteError(error.message)
      } else {
        setDeleteError(
          "خطایی در حذف لینک رخ داد."
        )
      }

    } finally {

      setDeleting(false)

    }

  }


  /* ---------------------------------------------
     Loading
  --------------------------------------------- */

  if (isLoading) {

    return (

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="flex min-h-96 items-center justify-center">

            <p className="text-sm text-(--muted)">
              در حال بارگذاری اطلاعات لینک...
            </p>

          </div>

        </div>

      </div>

    )

  }


  /* ---------------------------------------------
     Error / Not Found
  --------------------------------------------- */

  if (!link) {

    return (

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-10 text-center">

            <h1 className="text-xl font-bold">
              لینک پیدا نشد
            </h1>


            <p className="mt-2 text-sm text-(--muted)">
              {error ||
                "لینک مورد نظر وجود ندارد یا حذف شده است."}
            </p>


            <Link
              to="/dashboard/links"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover)"
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

    <>

      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-8">

            <Link
              to="/dashboard/links"
              className="mb-4 inline-flex items-center gap-2 text-sm text-(--muted) transition-colors hover:text-(--foreground)"
            >
              <ArrowRight size={16} />
              بازگشت به لینک‌های من
            </Link>


            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <h1 className="text-2xl font-bold sm:text-3xl">
                  {link.title || "جزئیات لینک"}
                </h1>

                <p className="mt-2 text-sm text-(--muted)">
                  مشاهده اطلاعات و آمار لینک
                </p>

              </div>


              <div className="flex items-center gap-2">

                {/* Edit */}

                <Link
                  to={`/dashboard/links/${link.id}/edit`}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-(--border) px-4 text-sm font-medium transition-colors hover:bg-(--surface-hover)"
                >
                  <Pencil size={15} />
                  ویرایش
                </Link>


                {/* Delete */}

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

          <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="min-w-0">

                <p className="text-xs text-(--muted)">
                  لینک کوتاه
                </p>


                <div className="mt-2 flex items-center gap-3">

                  <a
                    href={`https://${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="truncate text-lg font-semibold text-(--primary) hover:underline sm:text-xl"
                  >
                    {link.shortUrl}
                  </a>


                  <a
                    href={`https://${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="باز کردن لینک"
                    title="باز کردن لینک"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                  >
                    <ExternalLink size={17} />
                  </a>

                </div>


                <div className="mt-3 flex items-center gap-2">

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 rounded-lg border border-(--border) px-3 py-2 text-xs text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
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

          <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

            <p className="text-xs text-(--muted)">
              لینک مقصد
            </p>


            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="mt-2 block truncate text-sm text-(--foreground) transition-colors hover:text-(--primary) hover:underline"
            >
              {link.originalUrl}
            </a>

          </section>


          {/* Stats */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Clicks */}

            <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-(--muted)">
                    تعداد کلیک
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {link.clicks.toLocaleString("fa-IR")}
                  </p>

                </div>


                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">
                  <MousePointerClick size={21} />
                </div>

              </div>

            </div>


            {/* Created */}

            <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-(--muted)">
                    تاریخ ایجاد
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {formatPersianDate(link.createdAt)}
                  </p>

                </div>


                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--background) text-(--muted)">
                  <CalendarDays size={21} />
                </div>

              </div>

            </div>


            {/* Expiration */}

            <div className="rounded-2xl border border-(--border) bg-(--surface) p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-(--muted)">
                    انقضا
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {formatPersianDate(link.expiresAt)}
                  </p>

                </div>


                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--background) text-(--muted)">
                  <CalendarDays size={21} />
                </div>

              </div>

            </div>

          </div>


          {/* Analytics CTA */}

          <section className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <BarChart3
                    size={19}
                    className="text-(--primary)"
                  />

                  <h2 className="font-bold">
                    تحلیل عملکرد لینک
                  </h2>

                </div>


                <p className="mt-2 text-sm text-(--muted)">
                  جزئیات کامل کلیک‌ها، بازدیدها و عملکرد این لینک را مشاهده کنید.
                </p>

              </div>


              <Link
                to={`/dashboard/links/${link.id}/analytics`}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-(--primary) px-5 text-sm font-semibold text-white transition-colors hover:bg-(--primary-hover)"
              >
                مشاهده آمار
                <BarChart3 size={16} />
              </Link>

            </div>

          </section>

        </div>

      </div>


      {/* =========================================
          Delete Confirmation Modal
      ========================================= */}

      {showDeleteModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget &&
              !deleting
            ) {
              handleCloseDeleteModal()
            }

          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-link-title"
            className="w-full max-w-md overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-2xl"
          >

            {/* Header */}

            <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">

              <h2
                id="delete-link-title"
                className="font-bold"
              >
                حذف لینک
              </h2>


              <button
                type="button"
                disabled={deleting}
                onClick={handleCloseDeleteModal}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="بستن"
              >
                <X size={18} />
              </button>

            </div>


            {/* Body */}

            <div className="px-6 py-7">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <Trash2 size={25} />
              </div>


              <h3 className="mt-5 text-center text-base font-semibold">
                آیا از حذف این لینک مطمئن هستید؟
              </h3>


              <p className="mt-2 text-center text-sm leading-6 text-(--muted)">
                این لینک برای همیشه حذف خواهد شد و امکان
                بازگردانی آن وجود ندارد.
              </p>


              <div
                dir="ltr"
                className="mt-5 overflow-hidden rounded-xl bg-(--background) px-4 py-3 text-center text-sm font-medium"
              >
                {link.shortUrl}
              </div>


              {deleteError && (

                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-500">
                  {deleteError}
                </div>

              )}

            </div>


            {/* Footer */}

            <div className="flex gap-3 border-t border-(--border) px-5 py-4">

              <button
                type="button"
                disabled={deleting}
                onClick={handleCloseDeleteModal}
                className="flex-1 rounded-xl border border-(--border) px-4 py-2.5 text-sm font-medium transition-colors hover:bg-(--background) disabled:cursor-not-allowed disabled:opacity-50"
              >
                انصراف
              </button>


              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {deleting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    در حال حذف...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    تأیید حذف
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  )
}


export default LinkDetails