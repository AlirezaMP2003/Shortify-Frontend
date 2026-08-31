import {
  BarChart,
  Check,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  Loader2,
} from "lucide-react"

import Cookies from "js-cookie"
import { useState } from "react"

import { Link } from "react-router-dom"

import type { ShortLink } from "../../pages/dashboard/LinksPage"

import LinksPagination from "./LinksPagination"


interface LinksTableProps {
  links: ShortLink[]
  totalLinks: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ---------------------------------------------
   Persian Date
--------------------------------------------- */

const formatPersianDate = (date: string) => {
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


function LinksTable({
  links,
  totalLinks,
  currentPage,
  totalPages,
  onPageChange,
}: LinksTableProps) {

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [deletedIds, setDeletedIds] = useState<string[]>([])

  /* Link selected for deletion */
  const [deleteLink, setDeleteLink] = useState<ShortLink | null>(null)

  /* Delete loading state */
  const [isDeleting, setIsDeleting] = useState(false)

  /* Delete error */
  const [deleteError, setDeleteError] = useState<string | null>(null)


  const visibleLinks = links.filter(
    (link) => !deletedIds.includes(link.id)
  )


  /* ---------------------------------------------
     Copy
  --------------------------------------------- */

  const handleCopy = async (link: ShortLink) => {
    try {
      await navigator.clipboard.writeText(
        `https://${link.shortUrl}`
      )

      setCopiedId(link.id)

      setTimeout(() => {
        setCopiedId(null)
      }, 2000)

    } catch {
      setCopiedId(null)
    }
  }


  /* ---------------------------------------------
     Open Delete Modal
  --------------------------------------------- */

  const handleDelete = (link: ShortLink) => {
    setDeleteError("")
    setDeleteLink(link)
  }


  /* ---------------------------------------------
     Close Delete Modal
  --------------------------------------------- */

  const handleCloseDeleteModal = () => {

    if (isDeleting) {
      return
    }

    setDeleteLink(null)
    setDeleteError(null)
  }


  /* ---------------------------------------------
     Confirm Delete
  --------------------------------------------- */

  const handleConfirmDelete = async () => {

    if (!deleteLink) {
      return
    }

    try {

      setIsDeleting(true)
      setDeleteError(null)


      const accessToken = Cookies.get(
        "access_token"
      )


      if (!accessToken) {
        setDeleteError(
          "نشست شما منقضی شده است. لطفاً دوباره وارد شوید."
        )

        return
      }


      const response = await fetch(
        `${API_BASE_URL}/api/v1/links/${deleteLink.id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include"
        }
      )


      if (!response.ok) {

        if (response.status === 401) {
          throw new Error(
            "نشست شما منقضی شده است. لطفاً دوباره وارد شوید."
          )
        }

        if (response.status === 404) {
          throw new Error(
            "لینک موردنظر پیدا نشد."
          )
        }

        throw new Error(
          "حذف لینک با خطا مواجه شد."
        )
      }


      setDeletedIds((prev) => [
        ...prev,
        deleteLink.id,
      ])

      setDeleteLink(null)

    } catch (error) {

      setDeleteError(
        error instanceof Error
          ? error.message
          : "خطایی در حذف لینک رخ داد."
      )

    } finally {

      setIsDeleting(false)

    }
  }


  return (
    <>

      <section className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface)">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-(--border) px-5 py-4 sm:px-6">

          <div>

            <h2 className="font-bold">
              لینک‌های شما
            </h2>

            <p className="mt-1 text-xs text-(--muted)">
              {visibleLinks.length.toLocaleString("fa-IR")} لینک
            </p>

          </div>

        </div>


        {/* Empty State */}

        {visibleLinks.length === 0 ? (

          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--background) text-(--muted)">

              <ExternalLink size={24} />

            </div>

            <h3 className="mt-4 font-semibold">
              لینکی پیدا نشد
            </h3>

            <p className="mt-2 max-w-sm text-sm text-(--muted)">
              برای جستجوی دیگری تلاش کنید یا فیلترهای انتخاب‌شده را تغییر دهید.
            </p>

          </div>

        ) : (

          <>

            {/* Desktop */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-850px text-right">

                <thead>

                  <tr className="border-b border-(--border) text-xs text-(--muted)">

                    <th className="px-6 py-4 font-medium">
                      لینک کوتاه
                    </th>

                    <th className="px-6 py-4 font-medium">
                      لینک مقصد
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

                    <th className="px-6 py-4">
                      عملیات
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {visibleLinks.map((link) => (

                    <tr
                      key={link.id}
                      className="border-b border-(--border) last:border-0 transition-colors hover:bg-(--background)/50"
                    >

                      {/* Short URL */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)">

                            <ExternalLink size={16} />

                          </div>

                          <div>

                            <Link
                              to={`/dashboard/links/${link.id}`}
                              dir="ltr"
                              className="text-sm text-(--primary) transition-colors hover:underline"
                            >
                              {link.shortUrl}
                            </Link>


                            <button
                              type="button"
                              onClick={() => handleCopy(link)}
                              className="mt-1 flex items-center gap-1 text-[11px] text-(--muted) transition-colors hover:text-(--primary)"
                            >

                              {copiedId === link.id ? (
                                <>
                                  <Check size={11} />
                                  کپی شد
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  کپی لینک
                                </>
                              )}

                            </button>

                          </div>

                        </div>

                      </td>


                      {/* Original URL */}

                      <td className="max-w-260px px-6 py-5">

                        <p
                          dir="ltr"
                          title={link.originalUrl}
                          className="truncate text-right text-sm text-(--muted)"
                        >
                          {link.originalUrl}
                        </p>

                      </td>


                      {/* Clicks */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm">

                          <BarChart
                            size={15}
                            className="text-(--muted)"
                          />

                          {link.clicks.toLocaleString("fa-IR")}

                        </div>

                      </td>


                      {/* Status */}

                      <td className="px-6 py-5">

                        {link.status === "active" ? (

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


                      {/* Created At */}

                      <td className="px-6 py-5 text-sm text-(--muted)">
                        {formatPersianDate(link.createdAt)}
                      </td>


                      {/* Actions */}

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-1">

                          {/* Analytics */}

                          <Link
                            to={`/dashboard/links/${link.id}/analytics`}
                            title="آمار لینک"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--primary)/10 hover:text-(--primary)"
                          >
                            <BarChart size={16} />
                          </Link>


                          {/* Edit */}

                          <Link
                            to={`/dashboard/links/${link.id}/edit`}
                            title="ویرایش"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                          >
                            <Pencil size={16} />
                          </Link>


                          {/* Delete */}

                          <button
                            type="button"
                            title="حذف"
                            onClick={() => handleDelete(link)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>


            {/* Mobile */}

            <div className="divide-y divide-(--border) md:hidden">

              {visibleLinks.map((link) => (

                <div
                  key={link.id}
                  className="p-5"
                >

                  {/* Header */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--primary)/10 text-(--primary)">

                        <ExternalLink size={18} />

                      </div>


                      <div className="min-w-0">

                        <Link
                          to={`/dashboard/links/${link.id}`}
                          dir="ltr"
                          className="block truncate text-right text-sm font-semibold text-(--primary) transition-colors hover:underline"
                        >
                          {link.shortUrl}
                        </Link>


                        <p
                          dir="ltr"
                          title={link.originalUrl}
                          className="mt-1 truncate text-right text-xs text-(--muted)"
                        >
                          {link.originalUrl}
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-(--muted) hover:bg-(--background)"
                      aria-label="عملیات"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                  </div>


                  {/* Meta */}

                  <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex items-center gap-1.5 text-xs text-(--muted)">

                        <BarChart size={13} />

                        {link.clicks.toLocaleString("fa-IR")} کلیک

                      </div>


                      <span className="text-xs text-(--muted)">
                        {formatPersianDate(link.createdAt)}
                      </span>

                    </div>


                    {link.status === "active" ? (

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

                  </div>


                  {/* Mobile Actions */}

                  <div className="mt-4 flex gap-2">

                    {/* Copy */}

                    <button
                      type="button"
                      onClick={() => handleCopy(link)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-(--border) py-2 text-xs text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                    >

                      {copiedId === link.id ? (
                        <>
                          <Check size={14} />
                          کپی شد
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          کپی
                        </>
                      )}

                    </button>


                    {/* Analytics */}

                    <Link
                      to={`/dashboard/links/${link.id}/analytics`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-(--border) py-2 text-xs text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                    >
                      <BarChart size={14} />
                      آمار
                    </Link>


                    {/* Edit */}

                    <Link
                      to={`/dashboard/links/${link.id}/edit`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-(--border) py-2 text-xs text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground)"
                    >
                      <Pencil size={14} />
                      ویرایش
                    </Link>

                  </div>


                  {/* Mobile Delete */}

                  <button
                    type="button"
                    onClick={() => handleDelete(link)}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 py-2 text-xs text-red-500 transition-colors hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                    حذف لینک
                  </button>

                </div>

              ))}

            </div>


            {/* Pagination */}

            <LinksPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalLinks}
              itemsPerPage={5}
              onPageChange={onPageChange}
            />

          </>

        )}

      </section>


      {/* =========================================
          Delete Confirmation Modal
      ========================================= */}

      {deleteLink && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
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

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-(--border) px-5 py-4">

              <h2
                id="delete-link-title"
                className="font-bold"
              >
                حذف لینک
              </h2>


              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--background) hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="بستن"
              >
                <X size={18} />
              </button>

            </div>


            {/* Modal Body */}

            <div className="px-5 py-6 text-right">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">

                <Trash2 size={24} />

              </div>


              <h3 className="mt-4 text-center font-semibold">
                آیا از حذف این لینک مطمئن هستید؟
              </h3>


              <p className="mt-2 text-center text-sm leading-6 text-(--muted)">
                لینک زیر برای همیشه حذف خواهد شد و امکان بازگردانی آن وجود ندارد.
              </p>


              <div
                dir="ltr"
                className="mt-4 overflow-hidden rounded-xl bg-(--background) px-4 py-3 text-center text-sm font-medium"
              >
                {deleteLink.shortUrl}
              </div>


              {deleteError && (

                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-500">
                  {deleteError}
                </div>

              )}

            </div>


            {/* Modal Footer */}

            <div className="flex gap-3 border-t border-(--border) px-5 py-4">

              <button
                type="button"
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-(--border) px-4 py-2.5 text-sm font-medium transition-colors hover:bg-(--background) disabled:cursor-not-allowed disabled:opacity-50"
              >
                انصراف
              </button>


              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {isDeleting ? (
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

export default LinksTable