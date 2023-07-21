import { healthcheckController } from '../controllers/healthcheck.controllers';
import { Router } from 'express';

const healthcheckRouter = Router();

healthcheckRouter.get('/', healthcheckController);

export default healthcheckRouter;
