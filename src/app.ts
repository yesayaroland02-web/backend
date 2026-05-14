import express from 'express'
import cors from 'cors'

import categoryRoutes from './routes/categoryRoutes'
import todoRoutes from './routes/todoRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/categories', categoryRoutes)
app.use('/api/todos', todoRoutes)

app.get('/', (_req, res) => {
  res.send('API Running')
})

export default app