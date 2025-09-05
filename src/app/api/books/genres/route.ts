import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener todos los géneros únicos
export async function GET() {
  try {
    const genres = await prisma.book.findMany({
      select: {
        genre: true
      },
      distinct: ['genre']
    })

    const uniqueGenres = genres.map(book => book.genre).sort()

    return NextResponse.json(uniqueGenres)
  } catch (error) {
    console.error('Error fetching genres:', error)
    return NextResponse.json(
      { error: 'Error al obtener los géneros' },
      { status: 500 }
    )
  }
}
