import { Router } from 'express';
import quizRouter from './quiz';
import recommendationsRouter from './recommendations';
import productsRouter from './products';
import partnersRouter from './partners';
import adminRouter from './admin';
import webhooksRouter from './webhooks';
import articlesRouter from './articles';
import searchRouter from './search';

const routes = Router();

routes.use('/quiz', quizRouter);
routes.use('/recommendations', recommendationsRouter);
routes.use('/products', productsRouter);
routes.use('/partners', partnersRouter);
routes.use('/admin', adminRouter);
routes.use('/webhooks', webhooksRouter);
routes.use('/articles', articlesRouter);
routes.use('/search', searchRouter);

export { routes };
