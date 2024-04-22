/**
 * @swagger
 * /user/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               age: 30
 *               email: johndoe@example.com
 *               username: johndoe
 *               password: password123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Email or username is already taken
 *       '500':
 *         description: Internal server error
 */
