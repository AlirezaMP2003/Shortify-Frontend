import { Link2, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

function LinksHeader() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>

            <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Link2 size={21} />
                </div>

                <div>

                    <h1 className="text-2xl font-bold">
                    لینک‌های من
                    </h1>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                    تمام لینک‌های کوتاه‌شده خود را مدیریت کنید.
                    </p>

                </div>

            </div>

        </div>


      <button
        type="button"
        onClick={() => navigate("/dashboard/links/new")}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-semibold text-white transition-all hover:bg-[var(--primary-hover)]"
      >

        <Plus size={18} />

        ساخت لینک جدید

      </button>

    </section>
  )
}

export default LinksHeader