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
      include: {
        category: true,
      },
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
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch todo' })
  }
}

// CREATE
export const createTodo = async (req, res) => {
  try {
    const { title, description, priority, category_id } = req.body

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        priority,
        category: category_id
          ? {
              connect: { id: Number(category_id) }
            }
          : undefined
      },
      include: {
        category: true
      }
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create todo' })
  }
}

// UPDATE
export const updateTodo = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { title, description, priority, category_id } = req.body

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        category: category_id
          ? {
              connect: { id: Number(category_id) }
            }
          : {
              disconnect: true
            }
      },
      include: {
        category: true
      }
    })

    res.json(todo)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to update todo' })
  }
}
// DELETE
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

// TOGGLE
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
      data: {
        completed: !todo.completed,
      },
    })

    res.json(updated)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to toggle todo' })
  }
}
