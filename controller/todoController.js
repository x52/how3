// src/controllers/todoController.js
const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({ title, description, userId: req.userId });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a todo by ID
exports.updateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { title, description },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a todo by ID
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
