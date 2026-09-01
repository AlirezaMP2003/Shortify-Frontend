import {
  BarChart3,
  Link2,
  ShieldCheck,
} from "lucide-react"

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Link2,
      title: "لینک خود را وارد کنید",
      description:
        "لینک طولانی موردنظر خود را در Shortify وارد کنید.",
    },
    {
      number: "02",
      icon: ShieldCheck,
      title: "لینک اعتبارسنجی می‌شود",
      description:
        "قبل از ساخت لینک کوتاه، آدرس مقصد از نظر صحت و دسترسی بررسی می‌شود.",
    },
    {
      number: "03",
      icon: BarChart3,
      title: "لینک را مدیریت کنید",
      description:
        "لینک کوتاه خود را به اشتراک بگذارید و عملکرد آن را تحلیل کنید.",
    },
  ]

  return (
    <section className="border-y border-(--border) bg-(--surface) px-6 py-24 lg:py-32">

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}

        <div className="mx-auto max-w-2xl text-center">

          <span className="text-sm font-semibold text-(--primary)">
            نحوه کار
          </span>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            کوتاه کردن لینک، ساده‌تر از همیشه
          </h2>

          <p className="mt-5 leading-8 text-(--muted)">
            در چند مرحله ساده لینک خود را کوتاه کنید و
            کنترل بیشتری روی لینک‌هایتان داشته باشید.
          </p>

        </div>


        {/* Steps */}

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">

          {/* Connecting Line */}

          <div className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden border-t border-dashed border-(--border) md:block" />


          {steps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.number}
                className="relative rounded-3xl border border-(--border) bg-(--background) p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
              >

                {/* Icon */}

                <div className="relative z-10 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-(--border) bg-(--surface) text-(--primary) shadow-sm">

                    <Icon size={23} />

                  </div>


                  <span className="text-4xl font-bold text-(--border)">
                    {step.number}
                  </span>

                </div>


                {/* Content */}

                <h3 className="mt-8 text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-(--muted)">
                  {step.description}
                </p>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default HowItWorks