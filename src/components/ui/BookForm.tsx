'use client'

import { useState, useEffect } from 'react'

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
}

interface BookFormProps {
  book?: Book | null
  onSave: () => void
  onCancel: () => void
}

export function BookForm({ book, onSave, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publisher: '',
    price: '',
    stock: '',
    description: '',
    image1: '',
    image2: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publisher: book.publisher,
        price: book.price.toString(),
        stock: book.stock.toString(),
        description: book.description || '',
        image1: book.image1,
        image2: book.image2
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = book ? `/api/books/${book.id}` : '/api/books'
      const method = book ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(book ? 'Libro actualizado correctamente' : 'Libro creado correctamente')
        onSave()
      } else {
        const error = await response.json()
        alert(error.error || 'Error al guardar el libro')
      }
    } catch (error) {
      console.error('Error saving book:', error)
      alert('Error al guardar el libro')
    } finally {
      setLoading(false)
    }
  }

  const commonGenres = [
    'Ficción',
    'No Ficción',
    'Misterio',
    'Romance',
    'Ciencia Ficción',
    'Fantasía',
    'Biografía',
    'Historia',
    'Autoayuda',
    'Negocios',
    'Tecnología',
    'Cocina',
    'Viajes',
    'Arte',
    'Filosofía',
    'Psicología',
    'Educación',
    'Infantil',
    'Juvenil',
    'Poesía'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Ingresa el título del libro"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Autor *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Nombre del autor"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Género *
          </label>
          <select
            id="genre"
            name="genre"
            required
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          >
            <option value="">Selecciona un género</option>
            {commonGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
            Editorial *
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            required
            value={formData.publisher}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Nombre de la editorial"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="Cantidad disponible"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          placeholder="Descripción del libro (opcional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="image1" className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen 1 *
          </label>
          <input
            type="url"
            id="image1"
            name="image1"
            required
            value={formData.image1}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="https://ejemplo.com/imagen1.jpg"
          />
        </div>

        <div>
          <label htmlFor="image2" className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen 2 *
          </label>
          <input
            type="url"
            id="image2"
            name="image2"
            required
            value={formData.image2}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            placeholder="https://ejemplo.com/imagen2.jpg"
          />
        </div>
      </div>

      {/* Image Previews */}
      {(formData.image1 || formData.image2) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.image1 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Vista previa - Imagen 1</p>
              <img
                src={formData.image1}
                alt="Preview 1"
                className="w-full h-32 object-cover rounded-md border"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/200x300?text=Error+al+cargar+imagen`
                }}
              />
            </div>
          )}
          {formData.image2 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Vista previa - Imagen 2</p>
              <img
                src={formData.image2}
                alt="Preview 2"
                className="w-full h-32 object-cover rounded-md border"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/200x300?text=Error+al+cargar+imagen`
                }}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : (book ? 'Actualizar Libro' : 'Crear Libro')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
