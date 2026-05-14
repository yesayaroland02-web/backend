import { Request, Response } from 'express'
import prisma from '../lib/prisma'

// GET
export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      include: { category: true },
      orderBy: { created_at: 'desc' }
    })

    res.json(todos)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to fetch todos' })
  }
}

// CREATE
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, category_id } = req.body

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        category_id: category_id ? Number(category_id) : null,
      },
      include: { category: true }
    })

    res.json(todo)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to create todo' })
  }
}
