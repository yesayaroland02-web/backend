"use strict";
// backend/src/routes/todoRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todoController_1 = require("../controllers/todoController");
var router = express_1.default.Router();
router.get('/', todoController_1.getTodos);
router.get('/:id', todoController_1.getTodoById);
router.post('/', todoController_1.createTodo);
router.put('/:id', todoController_1.updateTodo);
router.delete('/:id', todoController_1.deleteTodo);
router.patch('/:id/toggle', todoController_1.toggleTodo);
exports.default = router;
