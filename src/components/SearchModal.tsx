import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { IoSearchOutline } from "react-icons/io5"
import { setIsSearchModalOpen } from "../features/modalsSlice"
import { useLazyGetProductsBySearchQuery } from "../services/productsService"
import { useNavigate } from "react-router-dom"
import { FaTimes } from "react-icons/fa"

const SearchModal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [trigger, { data, isLoading, isError }] =
    useLazyGetProductsBySearchQuery()
  const { isSearchModalOpen } = useAppSelector((s) => s.modals)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(handler)
  }, [search])

  useEffect(() => {
    if (debouncedSearch) {
      trigger(search).unwrap()
    }
  }, [debouncedSearch])

  return (
    <div
      className={`${
        isSearchModalOpen
          ? "fixed inset-0 z-50 w-full h-full backdrop-blur-2xl bg-black/40 flex items-start justify-center pt-20 px-4 sm:px-0"
          : "hidden"
      }`}
    >
      <div className="relative w-full sm:w-[500px] bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Close Button */}
        <FaTimes
          className="fixed top-6 right-6 text-white hover:text-red-500 cursor-pointer text-2xl transition z-50"
          onClick={() => {
            dispatch(setIsSearchModalOpen(false))
            setSearch("")
          }}
        />

        {/* Search Input */}
        <div className="relative p-4 border-b">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Rechercher des parfums..."
            maxLength={50}
          />
          <IoSearchOutline
            size={24}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {!isLoading && !isError && data?.data.length > 0 && (
            <ul className="divide-y">
              {data?.success &&
                data.data.map((product: any) => {
                  const { id, title, images } = product
                  return (
                    <li
                      key={id}
                      onClick={() => {
                        dispatch(setIsSearchModalOpen(false))
                        setSearch("")
                        navigate("/product/" + id)
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition"
                    >
                      <img
                        src={images[0]?.url}
                        alt={title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span className="font-medium text-gray-700 truncate">
                        {title}
                      </span>
                    </li>
                  )
                })}
            </ul>
          )}

          {/* Loading / Empty */}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          )}
          {!isLoading && data?.data.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
