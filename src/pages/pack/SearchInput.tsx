import { useEffect, useState } from "react"
import { useLazyGetProductsBySearchQuery } from "../../services/productsService"
import PerfumeLoadingSkeleton from "./PerfumeLoadingSkeleton"

interface Perfume {
  id: string
  title: string
  images: { url: string }[]
}

interface SearchInputProps {
  selected: Perfume | null
  onSelect: (perfume: Perfume | null) => void
}

const SearchInput = ({ selected, onSelect }: SearchInputProps) => {
  const [trigger, { data, isLoading }] = useLazyGetProductsBySearchQuery()
  const [search, setSearch] = useState(selected?.title || "")
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [showDropdown, setShowDropdown] = useState(false)

  const results = data?.data || []

  // Update local search if parent changes selected
  useEffect(() => {
    setSearch(selected?.title || "")
  }, [selected])

  // Debounce input
  useEffect(() => {
    const delay = setTimeout(() => setDebouncedSearch(search), 400)
    return () => clearTimeout(delay)
  }, [search])

  // Handle dropdown visibility and trigger search
  useEffect(() => {
    if (!search || (selected && search === selected.title)) {
      setShowDropdown(false)
      return
    }

    if (debouncedSearch.length > 1) {
      trigger(debouncedSearch)
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [debouncedSearch, search, selected, trigger])

  const handleSelect = (perfume: Perfume) => {
    onSelect(perfume)
    setSearch(perfume.title)
    setShowDropdown(false)
  }

  const handleClear = () => {
    setSearch("")
    setDebouncedSearch("")
    onSelect(null)
    setShowDropdown(false)
  }

  return (
    <div className="w-full max-w-ld flex flex-col gap-4 relative">
      {/* Input with clear button */}
      <div className="relative">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            if (selected) onSelect(null) // reset parent selection
          }}
          className="border-2 border-gray-700 outline-0 px-4 py-2 w-full rounded"
          placeholder="Rechercher un parfum..."
        />
        {search.length > 0 && (
          <button
            onClick={handleClear}
            className="
              absolute 
              right-3 
              top-1/2 
              -translate-y-1/2 
              text-gray-500 
              hover:text-black
              transition
            "
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-[52px] left-0 w-full bg-white rounded-xl border shadow-xl overflow-hidden z-50">
          {isLoading && (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <PerfumeLoadingSkeleton key={i} />
              ))}
            </div>
          )}

          {!isLoading && debouncedSearch.length > 1 && results.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-sm">
              Aucun parfum trouvé.
            </div>
          )}

          {!isLoading &&
            results.length > 0 &&
            results.map((p: Perfume) => (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
              >
                <img
                  src={p.images[0].url}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{p.title}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Selected perfume preview */}
      {selected && (
        <div className="border p-4 bg-gray-50 rounded-xl shadow-sm flex items-center gap-3">
          <img
            src={selected.images[0].url}
            alt={selected.title}
            className="w-14 h-14 object-cover rounded-md"
          />
          <div>
            <p className="font-semibold">{selected.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchInput
