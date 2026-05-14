import { Request, Response } from 'express'
import prisma from '../lib/prisma'

// GET TODOS
export const getTodos = async (req: Request, res: Response) => {
  try {
    const category = req.query.category

    const todos = await prisma.todo.findMany({
      where: category
        ? { category_id: Number(category) }
        : undefined,
      include: { category: true },
    })

    res.json(todos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch todos' })
  }
}

// GET BY ID
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const todo = await prisma.todo.findUnique({
      where: { id },
      include: { category: true },
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch todo' })
  }
}

// CREATE TODO (FIXED - NO CONNECT, SAFE)
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
      include: { category: true },
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create todo' })
  }
}

// UPDATE TODO (SAFE)
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { title, description, priority, category_id } = req.body

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        category_id: category_id ? Number(category_id) : null,
      },
      include: { category: true },
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update todo' })
  }
}

// DELETE TODO
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    await prisma.todo.delete({
      where: { id },
    })

    res.json({ message: 'Deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to delete todo' })
  }
}

// TOGGLE TODO
export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    const todo = await prisma.todo.findUnique({
      where: { id },
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const updated = await prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed },
    })

    res.json(updated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to toggle todo' })
  }
}
