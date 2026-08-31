import { useEffect, useMemo, useState } from "react"

import LinksHeader from "../../components/dashboard/LinksHeader"
import LinksToolbar from "../../components/dashboard/LinksToolbar"
import LinksTable from "../../components/dashboard/LinksTable"

import Cookies from "js-cookie"

export type LinkStatus = "active" | "expired"

export type SortOption =
| "newest"
| "oldest"
| "most-clicked"
| "least-clicked"

export interface ShortLink {
id: string
shortUrl: string
originalUrl: string
title: string
clicks: number
status: LinkStatus
createdAt: string
expiresAt: string | null
}

interface LinksApiResponse {
items: {
id: string
short_url: string
original_url: string
title: string
clicks: number
status: string
created_at: string
expires_at: string | null
}[]
page: number
limit: number
total: number
total_pages: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const LINKS_PER_PAGE = 5

function LinksPage() {
const [search, setSearch] = useState("")
const [status, setStatus] = useState<"all" | LinkStatus>("all")
const [sort, setSort] = useState<SortOption>("newest")

const [currentPage, setCurrentPage] = useState(1)

const [links, setLinks] = useState<ShortLink[]>([])
const [totalPages, setTotalPages] = useState(1)
const [totalLinks, setTotalLinks] = useState(0)

const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

useEffect(() => {
const fetchLinks = async () => {
try {
setLoading(true)
setError("")


    const token = Cookies.get("access_token")

    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: LINKS_PER_PAGE.toString(),
      sort,
    })

    const response = await fetch(
      `${API_BASE_URL}/api/v1/links?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    )

    const data: LinksApiResponse = await response.json()

    if (!response.ok) {
      throw new Error(
        data && "detail" in data
          ? String((data as unknown as { detail: string }).detail)
          : "دریافت لینک‌ها با خطا مواجه شد."
      )
    }

    const mappedLinks: ShortLink[] = data.items.map(
      (link) => ({
        id: link.id,
        shortUrl: link.short_url,
        originalUrl: link.original_url,
        title: link.title,
        clicks: link.clicks,
        status:
          link.status === "expired"
            ? "expired"
            : "active",
        createdAt: link.created_at,
        expiresAt: link.expires_at,
      })
    )

    setLinks(mappedLinks)
    setTotalPages(Math.max(1, data.total_pages))
    setTotalLinks(data.total)
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError("خطایی در دریافت لینک‌ها رخ داد.")
    }

    setLinks([])
  } finally {
    setLoading(false)
  }
}

fetchLinks()


}, [currentPage, sort])

const filteredLinks = useMemo(() => {
const normalizedSearch = search
.trim()
.toLowerCase()


return links.filter((link) => {
  const matchesSearch =
    normalizedSearch === "" ||
    link.shortUrl
      .toLowerCase()
      .includes(normalizedSearch) ||
    link.originalUrl
      .toLowerCase()
      .includes(normalizedSearch) ||
    link.title
      .toLowerCase()
      .includes(normalizedSearch)

  const matchesStatus =
    status === "all" || link.status === status

  return matchesSearch && matchesStatus
})


}, [links, search, status])

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

return ( <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">


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

    {error && (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-500">
        {error}
      </div>
    )}

    {loading ? (
      <div className="rounded-2xl border border-(--border) bg-(--surface) p-10 text-center text-sm text-[var(--muted)]">
        در حال دریافت لینک‌ها...
      </div>
    ) : (
      <LinksTable
        links={filteredLinks}
        totalLinks={
          search.trim() || status !== "all"
            ? filteredLinks.length
            : totalLinks
        }
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    )}

  </div>

</div>


)
}

export default LinksPage
