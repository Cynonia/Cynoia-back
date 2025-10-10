import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cynoia API',
      version: '1.0.0',
      description: 'Backend API for Cynoia - user management system',
      contact: {
        name: 'Cynoia Team',
        email: 'contact@cynoia.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp',
            },
          },
        },
        ConversationParticipant: {
          type: 'object',
          properties: {
            userId: { type: 'integer' },
            conversationId: { type: 'integer' },
            role: { type: 'string', nullable: true },
            joinedAt: { type: 'string', format: 'date-time' },
            lastReadAt: { type: 'string', format: 'date-time', nullable: true },
            user: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'integer' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
            },
          },
        },
        Message: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            conversationId: { type: 'integer' },
            senderId: { type: 'integer' },
            content: { type: 'string' },
            kind: { type: 'string', example: 'TEXT' },
            createdAt: { type: 'string', format: 'date-time' },
            sender: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'integer' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
              },
            },
          },
        },
        Conversation: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            type: { type: 'string', enum: ['PRIVATE', 'GROUP'] },
            name: { type: 'string', nullable: true },
            entitiesId: { type: 'integer' },
            createdById: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            participants: { type: 'array', items: { $ref: '#/components/schemas/ConversationParticipant' } },
            messages: { type: 'array', items: { $ref: '#/components/schemas/Message' } },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            stack: {
              type: 'string',
              description: 'Error stack trace (development only)',
            },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'OK',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
            },
            uptime: {
              type: 'number',
              description: 'Server uptime in seconds',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/app.ts'], 
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: ReturnType<typeof express>) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Cynoia API Documentation',
  }));
};

export default specs;
