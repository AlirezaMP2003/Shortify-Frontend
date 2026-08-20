import {
  AlertTriangle,
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  RefreshCw,
  BookOpen,
  Code2,
} from "lucide-react"

import { useState } from "react"


interface ApiKeyData {
  key: string
  status: "active" | "revoked"
  createdAt: string
}


function Api() {
  const [apiKey, setApiKey] = useState<ApiKeyData>({
    key: "sk_live_8f4a91d2c7e5b3a1",
    status: "active",
    createdAt: "۱۲ مرداد ۱۴۰۵",
  })

  const [showKey, setShowKey] = useState(false)

  const [copied, setCopied] = useState(false)


  const maskedKey = `${apiKey.key.slice(
    0,
    8
  )}${"•".repeat(18)}`


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey.key)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }


  const handleRegenerate = () => {
    const confirmed = window.confirm(
      "با ایجاد API Key جدید، کلید فعلی دیگر قابل استفاده نخواهد بود. ادامه می‌دهید؟"
    )

    if (!confirmed) {
      return
    }


    const newKey = `sk_live_${Math.random()
      .toString(36)
      .substring(2, 18)}`


    setApiKey({
      key: newKey,
      status: "active",
      createdAt: "امروز",
    })

    setCopied(false)
  }


  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold sm:text-3xl">
            API
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            API Key خود را مدیریت کنید و از API Shortify در پروژه‌های خود استفاده کنید.
          </p>

        </div>


        {/* API Key */}

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex flex-col gap-5">

            {/* Title */}

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                <KeyRound size={21} />

              </div>


              <div>

                <h2 className="font-bold">
                  API Key
                </h2>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  از این کلید برای احراز هویت درخواست‌های API استفاده کنید.
                </p>

              </div>

            </div>


            {/* Key */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="flex min-w-0 flex-1 items-center rounded-xl border border-[var(--border)] bg-[var(--background)] px-4">

                <code
                  dir="ltr"
                  className="min-w-0 flex-1 truncate text-sm"
                >
                  {showKey ? apiKey.key : maskedKey}
                </code>


                <button
                  type="button"
                  onClick={() =>
                    setShowKey((prev) => !prev)
                  }
                  title={
                    showKey
                      ? "مخفی کردن کلید"
                      : "نمایش کلید"
                  }
                  className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                >
                  {showKey ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>


              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-5 text-sm font-medium transition-colors hover:bg-[var(--surface-hover)]"
              >

                {copied ? (
                  <>
                    <Check size={16} />
                    کپی شد
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    کپی
                  </>
                )}

              </button>


              <button
                type="button"
                onClick={handleRegenerate}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-red-500/20 px-5 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
              >
                <RefreshCw size={16} />
                ایجاد کلید جدید
              </button>

            </div>


            {/* Warning */}

            <div className="flex gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">

              <AlertTriangle
                size={18}
                className="mt-0.5 shrink-0 text-orange-500"
              />

              <p className="text-xs leading-6 text-orange-600 dark:text-orange-400">
                API Key خود را در اختیار دیگران قرار ندهید.
                این کلید مانند رمز عبور عمل می‌کند و باید در
                محیط امن نگهداری شود.
              </p>

            </div>


            {/* Metadata */}

            <div className="flex flex-col gap-2 border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">

              <span>
                وضعیت:{" "}
                <span className="font-medium text-green-500">
                  فعال
                </span>
              </span>

              <span>
                ایجاد شده: {apiKey.createdAt}
              </span>

            </div>

          </div>

        </section>


        {/* API Documentation */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

              <BookOpen size={21} />

            </div>


            <div>

              <h2 className="font-bold">
                مستندات API
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Endpointهای اصلی API Shortify
              </p>

            </div>

          </div>


          <div className="mt-6 space-y-3">

            {/* Create */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-md bg-green-500/10 px-2.5 py-1 text-xs font-bold text-green-500">
                  POST
                </span>

                <code
                  dir="ltr"
                  className="text-sm"
                >
                  /api/links
                </code>

              </div>


              <p className="mt-3 text-sm text-[var(--muted)]">
                ساخت یک لینک کوتاه جدید
              </p>

            </div>


            {/* Get All */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-500">
                  GET
                </span>

                <code
                  dir="ltr"
                  className="text-sm"
                >
                  /api/links
                </code>

              </div>


              <p className="mt-3 text-sm text-[var(--muted)]">
                دریافت لیست لینک‌های کاربر
              </p>

            </div>


            {/* Get One */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-500">
                  GET
                </span>

                <code
                  dir="ltr"
                  className="text-sm"
                >
                  /api/links/:id
                </code>

              </div>


              <p className="mt-3 text-sm text-[var(--muted)]">
                دریافت اطلاعات یک لینک
              </p>

            </div>


            {/* Update */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-md bg-yellow-500/10 px-2.5 py-1 text-xs font-bold text-yellow-500">
                  PUT
                </span>

                <code
                  dir="ltr"
                  className="text-sm"
                >
                  /api/links/:id
                </code>

              </div>


              <p className="mt-3 text-sm text-[var(--muted)]">
                ویرایش اطلاعات یک لینک
              </p>

            </div>


            {/* Delete */}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-bold text-red-500">
                  DELETE
                </span>

                <code
                  dir="ltr"
                  className="text-sm"
                >
                  /api/links/:id
                </code>

              </div>


              <p className="mt-3 text-sm text-[var(--muted)]">
                حذف یک لینک
              </p>

            </div>

          </div>

        </section>


        {/* Example Request */}

        <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

              <Code2 size={21} />

            </div>


            <div>

              <h2 className="font-bold">
                نمونه درخواست
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                نمونه‌ای از ساخت لینک با API
              </p>

            </div>

          </div>


          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)]">

            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-4 py-3">

              <span className="text-xs text-[var(--muted)]">
                cURL
              </span>

            </div>


            <pre
              dir="ltr"
              className="overflow-x-auto bg-[#111827] p-5 text-left text-xs leading-7 text-gray-200"
            >
{`curl -X POST https://api.shortify.ir/api/links \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "original_url": "https://example.com"
  }'`}
            </pre>

          </div>

        </section>


        {/* Future API */}

        <div className="mt-6 rounded-2xl border border-dashed border-[var(--border)] p-6 text-center">

          <p className="text-sm font-medium">
            مستندات کامل API
          </p>

          <p className="mt-2 text-xs text-[var(--muted)]">
            در نسخه بعدی می‌توانیم Swagger / OpenAPI و
            مستندات کامل endpointها را اضافه کنیم.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Api