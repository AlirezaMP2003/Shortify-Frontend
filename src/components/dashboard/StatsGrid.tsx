import {
  ArrowUpLeft,
  CheckCircle2,
  Clock3,
  Link2,
  MousePointerClick,
} from "lucide-react"

function StatsGrid() {
  const stats = [
    {
      title: "کل لینک‌ها",
      value: "128",
      change: "+12.5%",
      description: "نسبت به ماه قبل",
      icon: Link2,
    },
    {
      title: "کل کلیک‌ها",
      value: "24,892",
      change: "+18.2%",
      description: "نسبت به ماه قبل",
      icon: MousePointerClick,
    },
    {
      title: "لینک‌های فعال",
      value: "116",
      change: "+8.4%",
      description: "در حال استفاده",
      icon: CheckCircle2,
    },
    {
      title: "لینک‌های منقضی",
      value: "12",
      change: "-4.2%",
      description: "نسبت به ماه قبل",
      icon: Clock3,
    },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm text-[var(--muted)]">
                  {stat.title}
                </p>

                <p className="mt-3 text-2xl font-bold">
                  {stat.value}
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">

                <Icon size={20} />

              </div>

            </div>


            <div className="mt-5 flex items-center gap-2">

              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">

                <ArrowUpLeft size={12} />

                {stat.change}

              </span>

              <span className="text-xs text-[var(--muted)]">
                {stat.description}
              </span>

            </div>

          </div>
        )
      })}

    </section>
  )
}

export default StatsGrid