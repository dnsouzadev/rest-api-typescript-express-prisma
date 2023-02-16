import express from "express"
import type { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as BookService from "./book.service"

export const bookRouter = express.Router()

// GET: List all the books
bookRouter.get("/", async (request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks()
        return response.status(200).json(books)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// GET: A unique book
bookRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const id: number = parseInt(request.params.id, 10)
        const book = await BookService.getBook(id)
        return response.status(200).json(book)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// POST: Add a book
bookRouter.post("/", body("title").isString(), body("authorId").isInt(), body("datePublished").isDate(),body("isFiction").isBoolean() ,async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    try {
        const book = request.body
        const newBook = await BookService.createBook(book)
        return response.status(201).json(newBook)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// PUT: Update a book
bookRouter.put("/:id", body("title").isString(), body("authorId").isInt(), body("datePublished").isDate().toDate(),body("isFiction").isBoolean() ,async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }
    try {
        const id: number = parseInt(request.params.id, 10)
        const book = request.body
        const newBook = await BookService.updateBook(book, id)
        return response.status(201).json(newBook)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})

// DELETE: Delete a Book
bookRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try {
        await BookService.deleteBook(id)
        return response.status(204).json("The book has been successfully deleted")
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})