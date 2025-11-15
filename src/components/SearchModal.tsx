import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../features/hooks"
import { IoClose, IoSearchOutline } from "react-icons/io5"
import { setIsSearchModalOpen } from "../features/modalsSlice"
import { useLazyGetProductsBySearchQuery } from "../services/productsService"
import { useNavigate } from "react-router-dom"

const SearchModal = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [trigger, { data, isLoading, isError }] =
    useLazyGetProductsBySearchQuery()
  const { isSearchModalOpen } = useAppSelector((s) => s.modals)
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)

    return () => clearTimeout(handler)
  }, [search])

  useEffect(() => {
    if (debouncedSearch) {
      trigger(search).unwrap()
      // console.log(data)
    }
  }, [debouncedSearch])

  return (
    <div
      className={`${
        isSearchModalOpen
          ? "w-full h-screen fixed inset-0 backdrop-blur-3xl z-50 px-4 pt-14"
          : "hidden"
      }`}
    >
      <div className="w-full px-2 sm:px-8 py-8">
        <IoClose
          className="text-red-500 hover:cursor-pointer min-h-8 min-w-8 absolute top-8 right-8"
          onClick={() => dispatch(setIsSearchModalOpen(false))}
        />
        <div className="relative">
          <input
            type="text"
            value={search}
            name="search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="bg-white w-full border px-4 py-2 outline-0"
            maxLength={20}
            placeholder="Le beau"
          />
          <IoSearchOutline
            size={26}
            className="absolute top-1/2 -translate-y-1/2 right-2"
          />
        </div>
        {!isLoading && !isError && data?.data.length > 0 && (
          <ul className="w-full flex flex-col bg-white border border-t-0">
            {data?.success &&
              // @ts-ignore
              data.data.map((product) => {
                const { id, title, images } = product
                return (
                  <li
                    className="flex items-center justify-start gap-4 py-2 px-4 hover:bg-gray-50 hover:cursor-pointer border-b last:border-b-0 "
                    key={id}
                    onClick={() => {
                      dispatch(setIsSearchModalOpen(false))
                      navigate("/product/" + id)
                    }}
                  >
                    <img
                      src={images[0].url}
                      alt=""
                      className="w-10 h-10 bg-center bg-cover"
                    />
                    <span className="font-semibold text-sm">{title}</span>
                  </li>
                )
              })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchModal
