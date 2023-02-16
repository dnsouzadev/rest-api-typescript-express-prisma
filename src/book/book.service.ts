import { Author } from "../author/author.service"
import { db } from "../utils/db.server"

type BookRead = {
    id: number,
    title: string,
    isFiction: boolean,
    datePublished: Date
    author: Author
    // authorId: number
}

export const listBooks = async(): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
            // authorId: true,
        },
    })
}

export const getBook = async(id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}