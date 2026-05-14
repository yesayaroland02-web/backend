import { Request, Response } from 'express'
import prisma from '../lib/prisma'

// GET
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
}

// CREATE
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const category = await prisma.category.create({
      data: { name }
    })

    res.status(201).json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create category' })
  }
}
