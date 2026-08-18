import {
  ChevronLeft,
  Copy,
  ExternalLink,
  Link2,
  MousePointerClick,
} from "lucide-react"

function RecentLinks() {
  const recentLinks = [
    {
      shortUrl: "shrt.ir/a82k",
      originalUrl: "https://example.com/product/iphone",
      clicks: "4,892",
      status: "فعال",
      createdAt: "امروز",
    },
    {
      shortUrl: "shrt.ir/x91m",
      originalUrl: "https://example.com/blog/technology",
      clicks: "3,641",
      status: "فعال",
      createdAt: "امروز",
    },
    {
      shortUrl: "shrt.ir/k72p",
      originalUrl: "https://example.com/landing",
      clicks: "2,984",
      status: "فعال",
      createdAt: "دیروز",
    },
    {
      shortUrl: "shrt.ir/q41z",
      originalUrl: "https://example.com/course",
      clicks: "2,315",
      status: "منقضی",
      createdAt: "۳ روز پیش",
    },
  ]

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

        <div>

          <h2 className="font-bold">
            آخرین لینک‌ها
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            آخرین لینک‌های ایجاد شده توسط شما
          </p>

        </div>


        <button
          type="button"
          className="flex items-center gap-2 text-xs font-medium text-[var(--primary)]"
        >

          مشاهده همه

          <ChevronLeft size={14} />

        </button>

      </div>


      {/* Desktop Table */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full text-right">

          <thead>

            <tr className="border-b border-[var(--border)] text-xs text-[var(--muted)]">

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

            {recentLinks.map((link) => (

              <tr
                key={link.shortUrl}
                className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--background)]/50"
              >

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">

                      <Link2 size={17} />

                    </div>

                    <div className="min-w-0">

                      <p
                        dir="ltr"
                        className="truncate text-right text-sm font-medium"
                      >
                        {link.shortUrl}
                      </p>

                      <p
                        dir="ltr"
                        className="mt-1 max-w-xs truncate text-right text-xs text-[var(--muted)]"
                      >
                        {link.originalUrl}
                      </p>

                    </div>

                  </div>

                </td>


                <td className="px-6 py-4">

                  <div className="flex items-center gap-2 text-sm">

                    <MousePointerClick
                      size={15}
                      className="text-[var(--muted)]"
                    />

                    {link.clicks}

                  </div>

                </td>


                <td className="px-6 py-4">

                  {link.status === "فعال" ? (

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


                <td className="px-6 py-4 text-sm text-[var(--muted)]">
                  {link.createdAt}
                </td>


                <td className="px-6 py-4">

                  <div className="flex items-center justify-end gap-1">

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                      aria-label="کپی لینک"
                    >
                      <Copy size={15} />
                    </button>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
                      aria-label="مشاهده لینک"
                    >
                      <ExternalLink size={15} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Mobile List */}

      <div className="divide-y divide-[var(--border)] md:hidden">

        {recentLinks.map((link) => (

          <div
            key={link.shortUrl}
            className="p-5"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                <Link2 size={18} />

              </div>


              <div className="min-w-0 flex-1">

                <p
                  dir="ltr"
                  className="truncate text-right text-sm font-semibold"
                >
                  {link.shortUrl}
                </p>

                <p
                  dir="ltr"
                  className="mt-1 truncate text-right text-xs text-[var(--muted)]"
                >
                  {link.originalUrl}
                </p>


                <div className="mt-3 flex items-center gap-4">

                  <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">

                    <MousePointerClick size={13} />

                    {link.clicks} کلیک

                  </span>


                  <span className="text-xs text-[var(--muted)]">
                    {link.createdAt}
                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  )
}

export default RecentLinks