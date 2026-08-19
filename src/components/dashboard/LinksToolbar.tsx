import {
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import type {
  LinkStatus,
  SortOption,
} from "../../pages/dashboard/LinksPage"

interface LinksToolbarProps {
  search: string
  status: "all" | LinkStatus
  sort: SortOption
  onSearchChange: (value: string) => void
  onStatusChange: (value: "all" | LinkStatus) => void
  onSortChange: (value: SortOption) => void
}

function LinksToolbar({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: LinksToolbarProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        {/* Search */}

        <div className="relative flex-1">

          <Search
            size={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="جستجو در لینک‌ها..."
            className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] pr-10 pl-4 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
          />

        </div>


        {/* Status */}

        <div className="relative">

          <Filter
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as "all" | LinkStatus
              )
            }
            className="h-11 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-10 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] lg:w-44"
          >

            <option value="all">
              همه وضعیت‌ها
            </option>

            <option value="active">
              فعال
            </option>

            <option value="expired">
              منقضی
            </option>

          </select>

        </div>


        {/* Sort */}

        <div className="relative">

          <SlidersHorizontal
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
          />

          <select
            value={sort}
            onChange={(event) =>
              onSortChange(
                event.target.value as SortOption
              )
            }
            className="h-11 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] py-2 pl-10 pr-10 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] lg:w-48"
          >

            <option value="newest">
              جدیدترین
            </option>

            <option value="oldest">
              قدیمی‌ترین
            </option>

            <option value="most-clicked">
              بیشترین کلیک
            </option>

            <option value="least-clicked">
              کمترین کلیک
            </option>

          </select>

        </div>

      </div>

    </section>
  )
}

export default LinksToolbar