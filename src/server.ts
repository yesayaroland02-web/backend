import express from 'express'
import cors from 'cors'

import todoRoutes from './routes/todoRoutes'
import categoryRoutes from './routes/categoryRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/todos', todoRoutes)
app.use('/api/categories', categoryRoutes)

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
