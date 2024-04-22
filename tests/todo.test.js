const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from app.js
const Todo = require('../models/Todos');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const mockUserId = new mongoose.Types.ObjectId();
describe('Todo Routes', () => {
    let authToken;

    beforeAll(async () => {
        // Mock JWT token for authentication
        const mockUser = { userId: mockUserId };
        authToken = jwt.sign(mockUser, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    describe('GET /getAllTodos', () => {
        it('should get all todos', async () => {
            const response = await request(app)
                .get('/api/getAllTodos')
                .set('Authorization', authToken)
                .expect(200);

            // Add your assertions here
        });
    });

    describe('GET /:id', () => {
        it('should get a todo by ID', async () => {
            // Create a mock todo
            const mockTodo = new Todo({
                title: 'Test Todo',
                description: 'Test Description',
                userId: mockUserId // Assuming this userId is used for authentication
            });
            await mockTodo.save();

            const response = await request(app)
                .get(`/api/${mockTodo._id}`)
                .set('Authorization', authToken)
                .expect(200);

            // Add your assertions here
        });
    });

    // Add test cases for other routes (createTodo, updateTodo, deleteTodo) similarly

    describe('POST /createTodo', () => {
        it('should create a new todo', async () => {
            const newTodoData = {
                title: 'New Todo',
                description: 'New Todo Description',
            };
    
            const response = await request(app)
                .post('/api/createTodo')
                .set('Authorization', authToken)
                .send(newTodoData)
                .expect(201);
    
            // Check if the response contains the created todo
            expect(response.body.title).toBe(newTodoData.title);
            expect(response.body.description).toBe(newTodoData.description);
            expect(response.body.userId).toBe(mockUserId.toHexString()); // Assuming userId is stored as ObjectId
        });
    });
    
    describe('PUT /:id', () => {
        it('should update a todo by ID', async () => {
            // Create a mock todo
            const mockTodo = new Todo({
                title: 'Test Todo',
                description: 'Test Description',
                userId: mockUserId // Assuming this userId is used for authentication
            });
            await mockTodo.save();
    
            const updatedTodoData = {
                title: 'Updated Todo',
                description: 'Updated Todo Description'
            };
    
            const response = await request(app)
                .put(`/api/${mockTodo._id}`)
                .set('Authorization', authToken)
                .send(updatedTodoData)
                .expect(200);
    
            // Check if the response contains the updated todo
            expect(response.body.title).toBe(updatedTodoData.title);
            expect(response.body.description).toBe(updatedTodoData.description);
            expect(response.body.userId).toBe(mockUserId.toHexString()); // Assuming userId is stored as ObjectId
        });
    });
    
    describe('DELETE /:id', () => {
        it('should delete a todo by ID', async () => {
            // Create a mock todo
            const mockTodo = new Todo({
                title: 'Test Todo',
                description: 'Test Description',
                userId: mockUserId // Assuming this userId is used for authentication
            });
            await mockTodo.save();
    
            const response = await request(app)
                .delete(`/api/${mockTodo._id}`)
                .set('Authorization', authToken)
                .expect(200);
    
            // Check if the response contains the success message
            expect(response.body.message).toBe('Todo deleted successfully');
        });
    });
    
});
