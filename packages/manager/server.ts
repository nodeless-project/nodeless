import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import { createErrorResponse } from './src/messages';

import routes from './src/routes';
import { PORT, BASE_PATH, LOG_TYPE, MONGODB_URI } from './src/constants';
import { createMongoDBConnection } from '@nodeless/util';

(async (): Promise<void> => {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(cors({ credentials: true, optionsSuccessStatus: 200 }));
  app.use(morgan(LOG_TYPE));

  await createMongoDBConnection(MONGODB_URI);

  // Routes
  app.use(BASE_PATH, routes);

  // 404 Handling
  app.use('*', (req, res): void => {
    createErrorResponse(res, 404);
  });

  // Bootup
  app.listen(PORT, (): void => {
    console.log(`Nodeless-Manager is up and running...`);
  });
})();
