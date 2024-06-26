// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const todoController = require('../controller/todoController');

// Middleware for verifying JWT token
router.use(verifyToken);

// Routes
router.get('/getAllTodos', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/createTodo', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
