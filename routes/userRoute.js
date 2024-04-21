const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/UserController');
const errorHandler = require('../middlewares/errorHandler');
const validateRequest = require('../middlewares/validationHandler');


// Validation middleware for user creation
const createUserValidation = [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('age').isInt({ min: 0 }),
    body('username').notEmpty(), // Adding validation for username
    body('password').isLength({ min: 6 }) // Adding validation for password (minimum length)
];

// Route for creating a new user
router.post('/createUser',createUserValidation, validateRequest, userController.createUser);

// Route for getting all users
router.get('/getAllUsers', userController.getAllUsers);

// Route for getting a user by ID
router.get('/id/:id', userController.getUserById);

// Route for updating a user by ID
router.put('/id/:id', userController.updateUser);

// Route for deleting a user by ID
router.delete('/id/:id', userController.deleteUser);


router.post('/login', userController.login);


module.exports = router;
