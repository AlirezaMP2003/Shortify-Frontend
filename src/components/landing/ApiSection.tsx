import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  Terminal,
} from "lucide-react"

function ApiSection() {
  const features = [
    "ساخت لینک کوتاه با API",
    "دریافت اطلاعات و آمار لینک",
    "مناسب برای وب‌سایت و اپلیکیشن",
    "احراز هویت امن",
  ]

  return (
    <section
      id="api"
      className="scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)] px-6 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Content */}

          <div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Code2 size={27} />
            </div>

            <span className="mt-7 block text-sm font-semibold text-[var(--primary)]">
              API قدرتمند
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Shortify را به سرویس خود متصل کنید
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-[var(--muted)]">
              با API کوتاه‌کننده لینک Shortify، قابلیت کوتاه کردن
              و مدیریت لینک را مستقیماً به وب‌سایت یا اپلیکیشن خود
              اضافه کنید.
            </p>


            {/* Features */}

            <div className="mt-8 space-y-4">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >

                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10">

                    <Check
                      size={14}
                      className="text-[var(--primary)]"
                    />

                  </div>

                  <span className="text-sm">
                    {feature}
                  </span>

                </div>
              ))}

            </div>


            {/* CTA */}

            <button
              type="button"
              className="mt-9 flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
            >
              مشاهده مستندات API

              <ArrowLeft size={17} />

            </button>

          </div>


          {/* Code Preview */}

          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[#111827] shadow-2xl shadow-black/10">

            {/* Terminal Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />

              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">

                <Terminal size={14} />

                API Request

              </div>

            </div>


            {/* Code */}

            <div className="overflow-x-auto p-6">

              <pre
                dir="ltr"
                className="text-left font-mono text-xs leading-7 text-gray-300 sm:text-sm"
              >
                <code>
                  <span className="text-purple-400">
                    POST
                  </span>{" "}
                  <span className="text-gray-300">
                    /api/v1/links
                  </span>
                  {"\n\n"}

                  <span className="text-gray-500">
                    Authorization:
                  </span>{" "}
                  <span className="text-green-400">
                    Bearer YOUR_API_KEY
                  </span>
                  {"\n\n"}

                  <span className="text-gray-500">
                    Content-Type:
                  </span>{" "}
                  <span className="text-green-400">
                    application/json
                  </span>
                  {"\n\n"}

                  <span className="text-gray-500">
                    {"{"}
                  </span>
                  {"\n"}

                  {"  "}
                  <span className="text-blue-400">
                    "url"
                  </span>
                  <span className="text-gray-500">
                    :
                  </span>{" "}
                  <span className="text-yellow-300">
                    "https://example.com/article"
                  </span>
                  {"\n"}

                  <span className="text-gray-500">
                    {"}"}
                  </span>
                </code>
              </pre>

            </div>


            {/* Response */}

            <div className="border-t border-white/10">

              <div className="flex items-center justify-between px-5 py-3">

                <div className="flex items-center gap-2 text-xs text-gray-400">

                  <span className="h-2 w-2 rounded-full bg-green-400" />

                  Response

                </div>

                <button
                  type="button"
                  className="text-gray-500 transition-colors hover:text-gray-300"
                  aria-label="کپی کد"
                >
                  <Copy size={15} />
                </button>

              </div>


              <div className="px-6 pb-6">

                <pre
                  dir="ltr"
                  className="overflow-x-auto text-left font-mono text-xs leading-6 text-gray-300"
                >
                  <code>
                    {`{
  "short_url": "sho.rt/a8K92x",
  "original_url": "https://example.com/article",
  "status": "active"
}`}
                  </code>
                </pre>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default ApiSection