module.exports = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'User Management API',
        version: '1.0.0',
        description: 'API endpoints for managing users',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./swagger/*.js'], // Path to the files containing OpenAPI annotations or YAML files in the swagger folder
  };
  