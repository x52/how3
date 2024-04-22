/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: string
 *       example:
 *         title: Sample Title
 *         description: Sample Description
 *         userId: sampleUserId
 * 
 * /api/getAllTodos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT TOKEN
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 * 
 * /api/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Todo ID
 *       - in: header
 *         name: Authorization
 *         description: JWT TOKEN
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Todo not found
 *       '500':
 *         description: Internal server error
 * 
 * /api/createTodo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT TOKEN
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
