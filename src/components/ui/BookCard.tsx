'use client'

import { useState } from 'react'

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

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const [currentImage, setCurrentImage] = useState(1)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getPlaceholderImage = () => {
    return `https://placehold.co/300x400?text=${encodeURIComponent(book.title + ' por ' + book.author)}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-64 bg-gray-100">
        <img
          src={imageError ? getPlaceholderImage() : (currentImage === 1 ? book.image1 : book.image2)}
          alt={`${book.title} - Imagen ${currentImage}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        
        {/* Image Toggle Buttons */}
        {!imageError && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            <button
              onClick={() => setCurrentImage(1)}
              className={`w-3 h-3 rounded-full ${
                currentImage === 1 ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label="Ver primera imagen"
            />
            <button
              onClick={() => setCurrentImage(2)}
              className={`w-3 h-3 rounded-full ${
                currentImage === 2 ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label="Ver segunda imagen"
            />
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              book.available && book.stock > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {book.available && book.stock > 0 ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm">por {book.author}</p>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>

        {book.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${book.price.toFixed(2)}
            </span>
            {book.stock > 0 && (
              <p className="text-xs text-gray-500">
                {book.stock} en stock
              </p>
            )}
          </div>
          
          <button
            disabled={!book.available || book.stock === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              book.available && book.stock > 0
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {book.available && book.stock > 0 ? 'Ver Detalles' : 'No Disponible'}
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Editorial: {book.publisher}
        </div>
      </div>
    </div>
  )
}
