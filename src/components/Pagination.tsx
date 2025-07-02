import { useAppDispatch, useAppSelector } from "../features/hooks"
import { setPage } from "../features/productsSlice"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

const PaginationComponent = () => {
  const dispatch = useAppDispatch()
  const { page, totalPages: pages } = useAppSelector((s) => s.products)

  if (pages === 0 || pages === 1) return <></>

  const handlePageClick = (p: number) => {
    if (p !== page && p >= 1 && p <= pages) {
      dispatch(setPage(p))
      window.scrollTo({ top: 0 })
    }
  }

  const renderPage = (p: number) => (
    <li
      key={p}
      onClick={() => handlePageClick(p)}
      className={`px-3.5 py-1 rounded border text-sm font-semibold hover:cursor-pointer ${
        page === p ? "text-white bg-black border-black" : "text-black"
      }`}
    >
      <span>{p}</span>
    </li>
  )

  const pageItems = []

  // Always show first page
  pageItems.push(renderPage(1))

  // Left ellipsis if needed
  if (page > 4) {
    pageItems.push(
      <li key="start-ellipsis">
        <span className="px-2 text-gray-500">...</span>
      </li>
    )
  }

  // Pages around current page
  const startPage = Math.max(2, page - 2)
  const endPage = Math.min(pages - 1, page + 2)

  for (let p = startPage; p <= endPage; p++) {
    pageItems.push(renderPage(p))
  }

  // Right ellipsis if needed
  if (page < pages - 3) {
    pageItems.push(
      <li key="end-ellipsis">
        <span className="px-2 text-gray-500">...</span>
      </li>
    )
  }

  // Always show last page (if not already shown)
  if (pages > 1) {
    pageItems.push(renderPage(pages))
  }

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      <ul className="flex items-center justify-center gap-2">
        <li
          className={`px-0.5 border rounded hover:cursor-pointer ${
            page === 1 && "hidden"
          }`}
        >
          <span onClick={() => handlePageClick(page - 1)}>
            <BiChevronLeft size={28} />
          </span>
        </li>

        {pageItems}

        <li
          className={`px-0.5 border rounded hover:cursor-pointer ${
            page === pages && "hidden"
          }`}
        >
          <span onClick={() => handlePageClick(page + 1)}>
            <BiChevronRight size={28} />
          </span>
        </li>
      </ul>
    </div>
  )
}

export default PaginationComponent
