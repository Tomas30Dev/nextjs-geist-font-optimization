'use client'

import { useState, useEffect } from 'react'
import { BookCard } from '@/components/ui/BookCard'
import { SearchBar } from '@/components/ui/SearchBar'
import { FilterMenu } from '@/components/ui/FilterMenu'

interface Book {
  id: number
  title: string
  author: string
  genre: string
  publisher: string
  price: number
  stock: number
  description: string | null
  image1: string
  image2: string
  available: boolean
  createdAt: string
  updatedAt: string
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')

  useEffect(() => {
    fetchBooks()
    fetchGenres()
  }, [])

  useEffect(() => {
    filterBooks()
  }, [books, searchTerm, selectedGenre])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchGenres = async () => {
    try {
      const response = await fetch('/api/books/genres')
      if (response.ok) {
        const data = await response.json()
        setGenres(data)
      }
    } catch (error) {
      console.error('Error fetching genres:', error)
    }
  }

  const filterBooks = () => {
    let filtered = books

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === selectedGenre)
    }

    setFilteredBooks(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando libros...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">LibroStore</h1>
            <p className="text-gray-300">Descubre tu próxima gran lectura</p>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <FilterMenu
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No se encontraron libros
            </h2>
            <p className="text-gray-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 LibroStore. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
