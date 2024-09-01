//import swaggerJsdoc from 'swagger-jsdoc';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger Express API',
        version: '1.0.0',
        description: 'A simple Express API with Swagger documentation',
      },
    },
    apis: [`${__dirname}/routes/*.ts`]
  };

const specs = swaggerJsdoc(options);

export default specs;