// backend/src/routes/todoRoutes.ts

import express from 'express'

import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from '../controllers/todoController'

const router = express.Router()

router.get('/', getTodos)

router.get('/:id', getTodoById)

router.post('/', createTodo)

router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

router.patch('/:id/toggle', toggleTodo)



export default router