import express from 'express'
import cors from 'cors'

import todoRoutes from './routes/todoRoutes'
import categoryRoutes from './routes/categoryRoutes'

const app = express()

// CORS (AMAN UNTUK VERCEL)
app.use(cors({
  origin: "*"
}))

app.use(express.json())

// ROUTES
app.use('/api/todos', todoRoutes)
app.use('/api/categories', categoryRoutes)

// PORT RAILWAY WAJIB ENV
const PORT: number = Number(process.env.PORT) || 5000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})
