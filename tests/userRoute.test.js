const request = require('supertest');
const app = require('../index');
const User = require('../models/Users');
const userController = require('../controller/UserController');

jest.mock('../models/Users');

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /getAllUsers', () => {
    it('should get all users', async () => {
      const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];

      User.find.mockResolvedValue(mockUsers);

      const response = await request(app).get('/user/getAllUsers').expect(200);

      expect(response.body).toEqual(mockUsers);
    });
  });

  // Add more test cases for other routes
});
