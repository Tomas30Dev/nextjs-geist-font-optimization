'use client'

import { useState, useEffect } from 'react'
import { BookForm } from '@/components/ui/BookForm'

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

export default function AdminPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

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

  const handleDeleteBook = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      return
    }

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setBooks(books.filter(book => book.id !== id))
        alert('Libro eliminado correctamente')
      } else {
        alert('Error al eliminar el libro')
      }
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('Error al eliminar el libro')
    }
  }

  const handleBookSaved = () => {
    fetchBooks()
    setShowForm(false)
    setEditingBook(null)
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingBook(null)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel de Administración</h1>
              <p className="text-gray-300">Gestiona el inventario de libros</p>
            </div>
            <a
              href="/"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Ver Tienda
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={handleAddNew}
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Agregar Nuevo Libro
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            Total de libros: {books.length}
          </div>
        </div>

        {/* Book Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {editingBook ? 'Editar Libro' : 'Agregar Nuevo Libro'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingBook(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <BookForm
                book={editingBook}
                onSave={handleBookSaved}
                onCancel={() => {
                  setShowForm(false)
                  setEditingBook(null)
                }}
              />
            </div>
          </div>
        )}

        {/* Books Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Libro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Autor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Género
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-8 object-cover rounded"
                          src={book.image1}
                          alt={book.title}
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/80x120?text=${encodeURIComponent(book.title)}`
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {book.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {book.publisher}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.available && book.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {book.available && book.stock > 0 ? 'Disponible' : 'Agotado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {books.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay libros registrados
            </h3>
            <p className="text-gray-500 mb-4">
              Comienza agregando tu primer libro al inventario
            </p>
            <button
              onClick={handleAddNew}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Agregar Primer Libro
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
