import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/tarefasRoutes.js';
import { swaggerSpec } from './config/swagger.js';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

export default app;
