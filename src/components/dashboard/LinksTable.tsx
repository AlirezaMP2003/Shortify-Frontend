import {
  BarChart,
  Check,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

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

function LinksTable({
  links,
  totalLinks,
  currentPage,
  totalPages,
  onPageChange,
}: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const [deletedIds, setDeletedIds] = useState<number[]>([])


  const visibleLinks = links.filter(
    (link) => !deletedIds.includes(link.id)
  )


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


  const handleDelete = (link: ShortLink) => {
    const confirmed = window.confirm(
      `آیا از حذف لینک «${link.shortUrl}» مطمئن هستید؟`
    )

    if (!confirmed) {
      return
    }

    setDeletedIds((prev) => [
      ...prev,
      link.id,
    ])
  }


  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-6">

        <div>

          <h2 className="font-bold">
            لینک‌های شما
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            {visibleLinks.length.toLocaleString("fa-IR")} لینک
          </p>

        </div>

      </div>


      {/* Empty State */}

      {visibleLinks.length === 0 ? (

        <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--background)] text-[var(--muted)]">

            <ExternalLink size={24} />

          </div>

          <h3 className="mt-4 font-semibold">
            لینکی پیدا نشد
          </h3>

          <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
            برای جستجوی دیگری تلاش کنید یا فیلترهای انتخاب‌شده را تغییر دهید.
          </p>

        </div>

      ) : (

        <>

          {/* Desktop */}

          <div className="hidden overflow-x-auto md:block">

            <table className="w-full min-w-[850px] text-right">

              <thead>

                <tr className="border-b border-[var(--border)] text-xs text-[var(--muted)]">

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
                    className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--background)]/50"
                  >

                    {/* Short URL */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">

                          <ExternalLink size={16} />

                        </div>

                        <div>

                          <Link
                            to={`/dashboard/links/${link.id}`}
                            dir="ltr"
                            className="text-sm text-[var(--primary)] transition-colors hover:underline"
                          >
                            {link.shortUrl}
                          </Link>


                          <button
                            type="button"
                            onClick={() => handleCopy(link)}
                            className="mt-1 flex items-center gap-1 text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
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

                    <td className="max-w-[260px] px-6 py-5">

                      <p
                        dir="ltr"
                        title={link.originalUrl}
                        className="truncate text-right text-sm text-[var(--muted)]"
                      >
                        {link.originalUrl}
                      </p>

                    </td>


                    {/* Clicks */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm">

                        <BarChart
                          size={15}
                          className="text-[var(--muted)]"
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

                    <td className="px-6 py-5 text-sm text-[var(--muted)]">
                      {link.createdAt}
                    </td>


                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-end gap-1">

                        {/* Analytics */}

                        <Link
                          to={`/dashboard/links/${link.id}/analytics`}
                          title="آمار لینک"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]"
                        >
                          <BarChart size={16} />
                        </Link>


                        {/* Edit */}

                        <Link
                          to={`/dashboard/links/${link.id}/edit`}
                          title="ویرایش"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                        >
                          <Pencil size={16} />
                        </Link>


                        {/* Delete */}

                        <button
                          type="button"
                          title="حذف"
                          onClick={() => handleDelete(link)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-red-500/10 hover:text-red-500"
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

          <div className="divide-y divide-[var(--border)] md:hidden">

            {visibleLinks.map((link) => (

              <div
                key={link.id}
                className="p-5"
              >

                {/* Header */}

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                      <ExternalLink size={18} />

                    </div>


                    <div className="min-w-0">

                      <Link
                        to={`/dashboard/links/${link.id}`}
                        dir="ltr"
                        className="block truncate text-right text-sm font-semibold text-[var(--primary)] transition-colors hover:underline"
                      >
                        {link.shortUrl}
                      </Link>


                      <p
                        dir="ltr"
                        title={link.originalUrl}
                        className="mt-1 truncate text-right text-xs text-[var(--muted)]"
                      >
                        {link.originalUrl}
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] hover:bg-[var(--background)]"
                    aria-label="عملیات"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                </div>


                {/* Meta */}

                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">

                      <BarChart size={13} />

                      {link.clicks.toLocaleString("fa-IR")} کلیک

                    </div>


                    <span className="text-xs text-[var(--muted)]">
                      {link.createdAt}
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-2 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-2 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                  >
                    <BarChart size={14} />
                    آمار
                  </Link>


                  {/* Edit */}

                  <Link
                    to={`/dashboard/links/${link.id}/edit`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-2 text-xs text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
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
  )
}

export default LinksTable