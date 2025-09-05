import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener un libro específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de libro inválido' },
        { status: 400 }
      )
    }

    const book = await prisma.book.findUnique({
      where: { id }
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Libro no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json(
      { error: 'Error al obtener el libro' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un libro
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de libro inválido' },
        { status: 400 }
      )
    }

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

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        genre,
        publisher,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image1,
        image2,
        available: parseInt(stock) > 0
      }
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el libro' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un libro
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID de libro inválido' },
        { status: 400 }
      )
    }

    await prisma.book.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Libro eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el libro' },
      { status: 500 }
    )
  }
}
