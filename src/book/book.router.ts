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