const request = require('supertest');
const app = require('../index');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controller/UserController');

jest.mock('../models/Users');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // Mock request body
      const reqBody = {
        name: 'Test User',
        age: 25,
        email: 'test@example.com',
        username: 'testuser',
        password: 'password'
      };

      // Mock User.findOne to return null (user does not exist)
      User.findOne.mockResolvedValue(null);
      
      // Mock bcrypt.hash to return hashed password
      bcrypt.hash.mockResolvedValue('hashedPassword');
      
      // Mock User.save to resolve successfully
      User.prototype.save.mockResolvedValue();

      const req = { body: reqBody };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
    });

    it('should return error if user already exists', async () => {
      // Mock request body
      const reqBody = {
        name: 'Test User',
        age: 25,
        email: 'test@example.com',
        username: 'testuser',
        password: 'password'
      };

      // Mock User.findOne to return existing user
      User.findOne.mockResolvedValue({});

      const req = { body: reqBody };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email or username is already taken' });
    });
  });

  // Add more test cases for other controller functions
});
