import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { getRecommendationsForUser } from '../services/recommendation-service';

const router = Router();

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const response = await getRecommendationsForUser(req.user!.id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
