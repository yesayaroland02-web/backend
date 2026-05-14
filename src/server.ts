import express from 'express'
import cors from 'cors'

import todoRoutes from './routes/todoRoutes'
import categoryRoutes from './routes/categoryRoutes'

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API running 🚀' })
})

app.use('/api/todos', todoRoutes)
app.use('/api/categories', categoryRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
