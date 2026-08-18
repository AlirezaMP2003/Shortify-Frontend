import {
  ChevronLeft,
  Link2,
} from "lucide-react"

function TopLinks() {
  const topLinks = [
    {
      shortUrl: "shrt.ir/a82k",
      originalUrl: "https://example.com/product/iphone",
      clicks: "4,892",
    },
    {
      shortUrl: "shrt.ir/x91m",
      originalUrl: "https://example.com/blog/technology",
      clicks: "3,641",
    },
    {
      shortUrl: "shrt.ir/k72p",
      originalUrl: "https://example.com/landing",
      clicks: "2,984",
    },
    {
      shortUrl: "shrt.ir/q41z",
      originalUrl: "https://example.com/course",
      clicks: "2,315",
    },
  ]

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="font-bold">
            محبوب‌ترین لینک‌ها
          </h2>

          <p className="mt-1 text-xs text-[var(--muted)]">
            لینک‌هایی با بیشترین کلیک
          </p>

        </div>

        <Link2
          size={19}
          className="text-[var(--primary)]"
        />

      </div>


      <div className="mt-6 space-y-4">

        {topLinks.map((link, index) => (

          <div
            key={link.shortUrl}
            className="flex items-center gap-3"
          >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--background)] text-xs font-bold text-[var(--muted)]">
              {index + 1}
            </div>


            <div className="min-w-0 flex-1">

              <p
                dir="ltr"
                className="truncate text-right text-sm font-medium"
              >
                {link.shortUrl}
              </p>

              <p
                dir="ltr"
                className="mt-1 truncate text-right text-xs text-[var(--muted)]"
              >
                {link.originalUrl}
              </p>

            </div>


            <div className="shrink-0 text-left">

              <p className="text-sm font-semibold">
                {link.clicks}
              </p>

              <p className="text-[10px] text-[var(--muted)]">
                کلیک
              </p>

            </div>

          </div>

        ))}

      </div>


      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-2.5 text-xs font-medium text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
      >

        مشاهده همه لینک‌ها

        <ChevronLeft size={14} />

      </button>

    </div>
  )
}

export default TopLinks