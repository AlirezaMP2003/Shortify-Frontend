import { ArrowLeft, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

function CTASection() {
  return (
    <section className="px-6 py-24 lg:py-32">

      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-(--primary) px-6 py-16 text-center text-white sm:px-12 lg:px-20">

        {/* Background Effects */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />


        <div className="relative mx-auto max-w-3xl">

          {/* Badge */}

          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium">

            <Sparkles size={14} />

            آماده شروع هستید؟

          </div>


          {/* Heading */}

          <h2 className="mt-7 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">

            لینک‌هایتان را
            <br />
            هوشمندانه‌تر مدیریت کنید

          </h2>


          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">

            همین حالا Shortify را امتحان کنید و مدیریت لینک‌های
            خود را ساده‌تر، سریع‌تر و حرفه‌ای‌تر کنید.

          </p>


          {/* Actions */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <Link
              to="/register"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-(--primary) transition-all hover:bg-white/90 sm:w-auto"
            >
              شروع رایگان

              <ArrowLeft size={17} />

            </Link>


            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 sm:w-auto"
            >
              ورود به حساب

            </Link>

          </div>

        </div>

      </div>

    </section>
  )
}

export default CTASection