import {
  Check,
  Globe,
  Lock,
  ShieldCheck,
} from "lucide-react"

function SecuritySection() {
  const checks = [
    "بررسی ساختار URL",
    "بررسی دسترسی به مقصد",
    "بررسی وضعیت دامنه",
    "بررسی امنیت لینک",
  ]

  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] px-6 py-24 lg:py-32">

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* Content */}

        <div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
            <ShieldCheck size={27} />
          </div>

          <span className="mt-7 block text-sm font-semibold text-green-500">
            امنیت و اعتبارسنجی
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            هر لینکی ارزش کوتاه شدن ندارد.
          </h2>

          <p className="mt-5 max-w-xl leading-8 text-[var(--muted)]">
            Shortify قبل از ایجاد لینک کوتاه، مقصد آن را
            بررسی می‌کند تا لینک‌های نامعتبر یا مشکوک وارد
            سیستم نشوند.
          </p>


          {/* Checks */}

          <div className="mt-8 space-y-4">

            {checks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >

                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10">

                  <Check
                    size={14}
                    className="text-green-500"
                  />

                </div>

                <span className="text-sm">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>


        {/* Validation Card */}

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-xl shadow-black/5 sm:p-8">

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

            {/* Card Header */}

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                <Lock size={20} />
              </div>

              <div>

                <p className="text-sm font-semibold">
                  بررسی لینک
                </p>

                <p className="mt-1 text-xs text-[var(--muted)]">
                  اعتبارسنجی مقصد
                </p>

              </div>

            </div>


            {/* URL */}

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-[var(--background)] p-4">

              <Globe
                size={18}
                className="shrink-0 text-[var(--muted)]"
              />

              <span
                dir="ltr"
                className="truncate text-xs text-[var(--muted)]"
              >
                https://example.com/product
              </span>

            </div>


            {/* Validation Steps */}

            <div className="mt-6 space-y-4">

              {checks.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                >

                  <span className="text-sm">
                    {item}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs text-green-500">

                    <Check size={14} />

                    تایید شد

                  </span>

                </div>
              ))}

            </div>


            {/* Result */}

            <div className="mt-6 rounded-xl bg-green-500/10 p-4 text-center">

              <p className="text-sm font-semibold text-green-500">
                لینک معتبر است
              </p>

              <p className="mt-1 text-xs text-green-500/70">
                آماده ایجاد لینک کوتاه
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default SecuritySection