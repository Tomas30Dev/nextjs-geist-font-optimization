'use client'

interface FilterMenuProps {
  genres: string[]
  selectedGenre: string
  onGenreChange: (genre: string) => void
}

export function FilterMenu({ genres, selectedGenre, onGenreChange }: FilterMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="genre-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Filtrar por género:
      </label>
      <select
        id="genre-filter"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black min-w-[200px]"
      >
        <option value="all">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  )
}
