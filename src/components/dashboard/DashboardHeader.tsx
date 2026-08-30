import { Plus, TrendingUp } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

function DashboardHeader() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <Link
          to="/dashboard/links"
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-(--primary)/10 px-3 py-1.5 text-xs font-medium text-(--primary) transition-colors hover:bg-(--primary)/20"
        >
          <TrendingUp size={14} />

          عملکرد این ماه
        </Link>

        <h1 className="text-2xl font-bold sm:text-3xl">
          وقت بخیر 👋
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-7 text-(--muted)">
          اینجا می‌توانید عملکرد لینک‌های کوتاه‌شده،
          تعداد کلیک‌ها و فعالیت‌های اخیر خود را مشاهده کنید.
        </p>

      </div>


      <button
        type="button"
        onClick={() => navigate("/dashboard/links/new")}
        className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-(--primary) px-5 text-sm font-semibold text-white transition-all hover:bg-(--primary-hover) cursor-pointer"
      >

        <Plus size={18} />

        ساخت لینک جدید

      </button>

    </section>
  )
}

export default DashboardHeader