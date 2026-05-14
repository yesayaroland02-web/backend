🗄️ Database Design
1. Database Tables
📌 Category
id (Primary Key)
name (Unique)

Purpose:
Category is used to group todos based on work types such as Work, Personal, and General.

📌 Todo
id (Primary Key)
title (String)
description (String, optional)
priority (low / medium / high)
completed (Boolean)
category_id (Foreign Key)

Purpose:
Todo is the main entity that stores user tasks or activities.

2. Relationships
One Category → Many Todos
Relationship type: One-to-Many
Category 1 ---- * Todo

Implemented using Prisma relation:

category Category? @relation(fields: [category_id], references: [id])
3. Why this structure?
Simple and scalable
Easy to filter by category
Matches real-world task management systems
Supports future expansion (authentication, deadlines, etc.)
🔎 Filtering

Filtering is handled in the backend using query parameters:

GET /api/todos?category=1
Prisma Query:
where: category
  ? { category_id: Number(category) }
  : undefined
📄 Pagination

Pagination is handled in the frontend (React) using array slicing:

const pageSize = 5

const paginated = todos.slice(
  (page - 1) * pageSize,
  page * pageSize
)
📊 Sorting & Indexing
Default sorting: id (ascending)
Recommended improvement:
created_at DESC
Add index on category_id for faster filtering
🏗️ Backend Architecture
1. API Structure
/api/todos
/api/categories

CRUD operations:

GET
POST
PUT
DELETE
PATCH (toggle completed)
2. Code Structure
src/
 ├── controllers/
 ├── routes/
 ├── lib/prisma.ts
 ├── server.ts
Controllers: business logic
Routes: endpoint definitions
Prisma: database access layer
3. Error Handling

Using try-catch in every controller:

try {
  // logic
} catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Internal Server Error' })
}
✅ Data Validation
1. Where validation happens
Backend (main validation)
Frontend (UI-level validation only)
2. Validation rules
title: required
category_id: optional
priority: optional (low, medium, high)
3. Why backend validation?
Prevent invalid API requests
Improve security
Ensure data consistency
🧪 Testing & Quality
1. What would be tested
createTodo
updateTodo
deleteTodo
toggleTodo
category creation
2. Edge cases considered
Empty title
Invalid category_id
Non-existing todo ID
Null value handling
3. Test structure
Unit tests per controller function
Mock Prisma client
Focus on API logic validation
🚀 Future Improvements
Technical Debt
Add service layer (separate business logic from controllers)
Add validation library (Zod / Joi)
Implement global error handler middleware
Features
User authentication (JWT)
User-specific todos
Due dates & reminders
Drag & drop Kanban board
Search optimization
Refactoring
Clean architecture (controller → service → repository)
Improved error handling system
Add caching (Redis)
🌐 Deployment
Backend: Railway
Database: PostgreSQL (Railway)
Frontend: https://frontend-sigma-five-90.vercel.app/
