import { ArrowLeft, Link2, Sparkles } from "lucide-react"
import { useState } from "react"

function Hero() {
  const [url, setUrl] = useState("")

  return (
    <section className="relative overflow-hidden">

      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute right-0 top-72 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      </div>


      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pb-32 lg:pt-32">

        <div className="mx-auto max-w-4xl text-center">


          {/* Badge */}

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--muted)] shadow-sm">

            <Sparkles
              size={14}
              className="text-[var(--primary)]"
            />

            مدیریت هوشمند لینک‌ها

          </div>


          {/* Title */}

          <h1 className="text-4xl font-bold leading-[1.25] tracking-tight sm:text-5xl lg:text-7xl">

            لینک‌هایتان را

            <span className="block bg-gradient-to-l from-indigo-500 to-violet-500 bg-clip-text text-transparent">
              کوتاه‌تر و هوشمندتر
            </span>

            کنید

          </h1>


          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">

            با Shortify لینک‌های کوتاه، امن و قابل‌اندازه‌گیری
            بسازید و تمام لینک‌های خود را در یک داشبورد حرفه‌ای
            مدیریت کنید.

          </p>


          {/* URL Form */}

          <div className="mx-auto mt-10 max-w-3xl">

            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl shadow-black/5 sm:flex-row">

              <div className="flex min-w-0 flex-1 items-center gap-3 px-4">

                <Link2
                  size={20}
                  className="shrink-0 text-[var(--muted)]"
                />

                <input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="لینک طولانی خود را وارد کنید..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[var(--muted)]"
                />

              </div>


              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-3 font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
              >

                کوتاه کن

                <ArrowLeft size={18} />

              </button>

            </div>


            <p className="mt-3 text-xs text-[var(--muted)]">
              لینک شما قبل از کوتاه شدن اعتبارسنجی می‌شود.
            </p>

          </div>


          {/* Statistics */}

          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-5 text-sm">

            <div>

              <span className="font-bold text-[var(--foreground)]">
                12K+
              </span>

              <span className="mr-2 text-[var(--muted)]">
                لینک ساخته شده
              </span>

            </div>


            <div>

              <span className="font-bold text-[var(--foreground)]">
                99.9%
              </span>

              <span className="mr-2 text-[var(--muted)]">
                دسترس‌پذیری
              </span>

            </div>


            <div>

              <span className="font-bold text-[var(--foreground)]">
                24/7
              </span>

              <span className="mr-2 text-[var(--muted)]">
                پایش لینک‌ها
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero