import express from 'express';

import auth from './auth/auth.router';
import swaggerDocument from '../swagger.json';
import swaggerUi from 'swagger-ui-express';
import timeline from './timeline/timeline.router';

const router = express.Router();

// Serve the swagger.json file as the root route
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument));

router.use('/timeline', timeline);
router.use('/auth', auth);

export default router;