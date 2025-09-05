import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los libros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const genre = searchParams.get('genre')

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { publisher: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (genre && genre !== 'all') {
      where.genre = genre
    }

    const books = await prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Error al obtener los libros' },
      { status: 500 }
    )
  }
}

// POST - Crear un nuevo libro
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      author,
      genre,
      publisher,
      price,
      stock,
      description,
      image1,
      image2
    } = body

    // Validación básica
    if (!title || !author || !genre || !publisher || !price || !image1 || !image2) {
      return NextResponse.json(
        { error: 'Todos los campos obligatorios deben ser completados' },
        { status: 400 }
      )
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        publisher,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        description: description || '',
        image1,
        image2,
        available: parseInt(stock) > 0
      }
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Error al crear el libro' },
      { status: 500 }
    )
  }
}
