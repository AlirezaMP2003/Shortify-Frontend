import {
  Check,
  Copy,
  ExternalLink,
  Plus,
} from "lucide-react"
import { useState } from "react"

interface LinkCreatedSuccessProps {
  shortUrl: string
  originalUrl: string
  onCreateAnother: () => void
}

function LinkCreatedSuccess({
  shortUrl,
  originalUrl,
  onCreateAnother,
}: LinkCreatedSuccessProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">

      {/* Success Icon */}

      <div className="mb-6 flex justify-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">

          <Check size={32} />

        </div>

      </div>


      {/* Header */}

      <div className="mb-8 text-center">

        <h1 className="text-2xl font-bold sm:text-3xl">
          لینک شما ساخته شد!
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          لینک کوتاه شما آماده استفاده است.
        </p>

      </div>


      {/* Main Card */}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

        {/* Short URL */}

        <div>

          <p className="mb-2 text-sm text-[var(--muted)]">
            لینک کوتاه
          </p>

          <div className="flex items-center gap-2">

            <div
              dir="ltr"
              className="min-w-0 flex-1 truncate rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-semibold text-[var(--primary)]"
            >
              {shortUrl}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] transition-colors hover:bg-[var(--surface-hover)]"
              title="کپی لینک"
            >
              {copied ? (
                <Check
                  size={18}
                  className="text-green-500"
                />
              ) : (
                <Copy size={18} />
              )}
            </button>

          </div>

          <p className="mt-2 text-xs text-[var(--muted)]">
            {copied
              ? "لینک در کلیپ‌بورد کپی شد."
              : "برای کپی کردن لینک روی دکمه کلیک کنید."}
          </p>

        </div>


        {/* Destination */}

        <div className="mt-6 border-t border-[var(--border)] pt-6">

          <p className="mb-2 text-sm text-[var(--muted)]">
            لینک مقصد
          </p>

          <div className="flex items-center gap-3">

            <ExternalLink
              size={17}
              className="shrink-0 text-[var(--muted)]"
            />

            <p
              dir="ltr"
              title={originalUrl}
              className="truncate text-sm"
            >
              {originalUrl}
            </p>

          </div>

        </div>


        {/* Actions */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={onCreateAnother}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
          >
            <Plus size={17} />

            ساخت لینک جدید
          </button>

          <a
            href={`https://${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)]"
          >
            مشاهده لینک

            <ExternalLink size={17} />

          </a>

        </div>

      </div>

    </div>
  )
}

export default LinkCreatedSuccess