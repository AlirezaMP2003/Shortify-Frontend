import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface LinksPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

function LinksPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: LinksPaginationProps) {
  if (totalItems === 0) {
    return null
  }

  const startItem =
    (currentPage - 1) * itemsPerPage + 1

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  )

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return (
    <div className="flex flex-col gap-4 border-t border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

      <p className="text-xs text-[var(--muted)]">
        نمایش{" "}
        {startItem.toLocaleString("fa-IR")}
        {" تا "}
        {endItem.toLocaleString("fa-IR")}
        {" از "}
        {totalItems.toLocaleString("fa-IR")}
        {" لینک"}
      </p>


      <div className="flex items-center justify-center gap-1">

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="صفحه قبل"
        >
          <ChevronRight size={16} />
        </button>


        {pages.map((page) => (

          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs transition-colors ${
              currentPage === page
                ? "bg-[var(--primary)] font-semibold text-white"
                : "text-[var(--muted)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            }`}
          >
            {page.toLocaleString("fa-IR")}
          </button>

        ))}


        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="صفحه بعد"
        >
          <ChevronLeft size={16} />
        </button>

      </div>

    </div>
  )
}

export default LinksPagination