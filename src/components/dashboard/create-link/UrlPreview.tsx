import {
  Check,
  Copy,
  ExternalLink,
  Link2,
} from "lucide-react"

interface UrlPreviewProps {
  customSlug: string
  originalUrl: string
}

function UrlPreview({
  customSlug,
  originalUrl,
}: UrlPreviewProps) {
  const shortUrl = customSlug.trim()
    ? `shortify.ir/${customSlug.trim()}`
    : "shortify.ir/abc123"

  const hasUrl = originalUrl.trim().length > 0

  return (
    <section className="rounded-2xl border border-(--border) bg-(--surface) p-5 sm:p-7">

      <div className="mb-6">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10 text-(--primary)">

            <Link2 size={18} />

          </div>

          <h2 className="font-bold">
            پیش‌نمایش
          </h2>

        </div>

        <p className="mt-2 text-xs text-(--muted)">
          لینک کوتاه شما بعد از ایجاد در اینجا نمایش داده می‌شود.
        </p>

      </div>


      {/* Short URL */}

      <div className="rounded-xl border border-(--border) bg-(--background) p-4">

        <div className="flex items-center justify-between gap-3">

          <div className="min-w-0">

            <p className="mb-1 text-xs text-(--muted)">
              لینک کوتاه
            </p>

            <p
              dir="ltr"
              className="truncate text-sm font-semibold text-(--primary)"
            >
              {shortUrl}
            </p>

          </div>


          <button
            type="button"
            disabled={!hasUrl}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-(--muted) transition-colors hover:bg-(--surface-hover) hover:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-40"
            title="کپی لینک"
          >
            <Copy size={16} />
          </button>

        </div>

      </div>


      {/* Destination */}

      <div className="mt-3 rounded-xl border border-(--border) bg-(--background) p-4">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 text-(--muted)">
            <ExternalLink size={16} />
          </div>

          <div className="min-w-0">

            <p className="mb-1 text-xs text-(--muted)">
              لینک مقصد
            </p>

            {hasUrl ? (

              <p
                dir="ltr"
                title={originalUrl}
                className="truncate text-sm"
              >
                {originalUrl}
              </p>

            ) : (

              <p className="text-sm text-(--muted)">
                هنوز لینکی وارد نشده است
              </p>

            )}

          </div>

        </div>

      </div>


      {/* Status */}

      <div className="mt-4 flex items-center gap-2 text-xs text-(--muted)">

        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-500">

          <Check size={12} />

        </div>

        <span>
          لینک شما قبل از ایجاد اعتبارسنجی می‌شود.
        </span>

      </div>

    </section>
  )
}

export default UrlPreview