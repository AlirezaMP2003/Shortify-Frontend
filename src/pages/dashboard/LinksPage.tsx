import { useMemo, useState } from "react"

import LinksHeader from "../../components/dashboard/LinksHeader"
import LinksToolbar from "../../components/dashboard/LinksToolbar"
import LinksTable from "../../components/dashboard/LinksTable"

export type LinkStatus = "active" | "expired"

export type SortOption =
  | "newest"
  | "oldest"
  | "most-clicked"
  | "least-clicked"

export interface ShortLink {
  id: number
  shortUrl: string
  originalUrl: string
  clicks: number
  status: LinkStatus
  createdAt: string
}

const LINKS_PER_PAGE = 5

const links: ShortLink[] = [
  {
    id: 1,
    shortUrl: "shrt.ir/a82k",
    originalUrl: "https://example.com/product/iphone",
    clicks: 4892,
    status: "active",
    createdAt: "امروز",
  },
  {
    id: 2,
    shortUrl: "shrt.ir/x91m",
    originalUrl: "https://example.com/blog/technology",
    clicks: 3641,
    status: "active",
    createdAt: "امروز",
  },
  {
    id: 3,
    shortUrl: "shrt.ir/k72p",
    originalUrl: "https://example.com/landing",
    clicks: 2984,
    status: "active",
    createdAt: "دیروز",
  },
  {
    id: 4,
    shortUrl: "shrt.ir/q41z",
    originalUrl: "https://example.com/course",
    clicks: 2315,
    status: "expired",
    createdAt: "۳ روز پیش",
  },
  {
    id: 5,
    shortUrl: "shrt.ir/m53n",
    originalUrl: "https://example.com/articles/design",
    clicks: 1842,
    status: "active",
    createdAt: "۵ روز پیش",
  },
  {
    id: 6,
    shortUrl: "shrt.ir/p19x",
    originalUrl: "https://example.com/register",
    clicks: 927,
    status: "active",
    createdAt: "۱ هفته پیش",
  },
  {
    id: 7,
    shortUrl: "shrt.ir/t64b",
    originalUrl: "https://example.com/news",
    clicks: 742,
    status: "active",
    createdAt: "۱ هفته پیش",
  },
  {
    id: 8,
    shortUrl: "shrt.ir/v38d",
    originalUrl: "https://example.com/about",
    clicks: 531,
    status: "expired",
    createdAt: "۲ هفته پیش",
  },
  {
    id: 9,
    shortUrl: "shrt.ir/n25f",
    originalUrl: "https://example.com/contact",
    clicks: 428,
    status: "active",
    createdAt: "۲ هفته پیش",
  },
  {
    id: 10,
    shortUrl: "shrt.ir/r17c",
    originalUrl: "https://example.com/pricing",
    clicks: 315,
    status: "active",
    createdAt: "۳ هفته پیش",
  },
]

function LinksPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | LinkStatus>("all")
  const [sort, setSort] = useState<SortOption>("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredAndSortedLinks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    const filtered = links.filter((link) => {
      const matchesSearch =
        normalizedSearch === "" ||
        link.shortUrl.toLowerCase().includes(normalizedSearch) ||
        link.originalUrl.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        status === "all" || link.status === status

      return matchesSearch && matchesStatus
    })

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return b.id - a.id

        case "most-clicked":
          return b.clicks - a.clicks

        case "least-clicked":
          return a.clicks - b.clicks

        case "newest":
        default:
          return a.id - b.id
      }
    })
  }, [search, status, sort])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedLinks.length / LINKS_PER_PAGE)
  )

  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedLinks = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * LINKS_PER_PAGE

    return filteredAndSortedLinks.slice(
      startIndex,
      startIndex + LINKS_PER_PAGE
    )
  }, [filteredAndSortedLinks, safeCurrentPage])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (
    value: "all" | LinkStatus
  ) => {
    setStatus(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value: SortOption) => {
    setSort(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl space-y-6">

        <LinksHeader />

        <LinksToolbar
          search={search}
          status={status}
          sort={sort}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onSortChange={handleSortChange}
        />

        <LinksTable
          links={paginatedLinks}
          totalLinks={filteredAndSortedLinks.length}
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>

    </div>
  )
}

export default LinksPage