// src/controllers/todoController.test.js
const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from index.js
const Todo = require('../models/Todo');

// Mock Todo model


describe('Todo Controller', () => {
    // Existing test cases...

    describe('POST /api/todos', () => {
        it('should create a new todo', async () => {
            const newTodo = { title: 'New Todo', description: 'New Description', userId: 'user_id_1' };
            Todo.prototype.save.mockResolvedValue(newTodo);

            const response = await request(app)
                .post('/api/todos')
                .send({ title: 'New Todo', description: 'New Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newTodo);
        });

        it('should handle validation error', async () => {
            const response = await request(app)
                .post('/api/todos')
                .send({ description: 'New Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500); // Assuming validation is handled with Mongoose schema
        });

        it('should handle database error', async () => {
            Todo.prototype.save.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/api/todos')
                .send({ title: 'New Todo', description: 'New Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error');
        });
    });

    describe('PUT /api/todos/:id', () => {
        it('should update a todo', async () => {
            const updatedTodo = { title: 'Updated Todo', description: 'Updated Description', userId: 'user_id_1' };
            Todo.findOneAndUpdate.mockResolvedValue(updatedTodo);

            const response = await request(app)
                .put('/api/todos/1')
                .send({ title: 'Updated Todo', description: 'Updated Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedTodo);
        });

        it('should handle not found error', async () => {
            Todo.findOneAndUpdate.mockResolvedValue(null);

            const response = await request(app)
                .put('/api/todos/1')
                .send({ title: 'Updated Todo', description: 'Updated Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Todo not found');
        });

        it('should handle database error', async () => {
            Todo.findOneAndUpdate.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put('/api/todos/1')
                .send({ title: 'Updated Todo', description: 'Updated Description' })
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error');
        });
    });

    describe('DELETE /api/todos/:id', () => {
        it('should delete a todo', async () => {
            const deletedTodo = { title: 'Todo 1', description: 'Description 1', userId: 'user_id_1' };
            Todo.findOneAndDelete.mockResolvedValue(deletedTodo);

            const response = await request(app)
                .delete('/api/todos/1')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Todo deleted successfully');
        });

        it('should handle not found error', async () => {
            Todo.findOneAndDelete.mockResolvedValue(null);

            const response = await request(app)
                .delete('/api/todos/1')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Todo not found');
        });

        it('should handle database error', async () => {
            Todo.findOneAndDelete.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .delete('/api/todos/1')
                .set('Authorization', 'Bearer token');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Database error');
        });
    });
});
