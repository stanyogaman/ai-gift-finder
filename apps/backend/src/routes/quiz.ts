import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

const quizSchema = z.object({
  preferences: z.array(z.string()),
  event: z.string(),
  budgetMin: z.number().min(0),
  budgetMax: z.number().min(1),
  notes: z.string().optional()
});

router.post('/', authenticate(), async (req, res, next) => {
  try {
    const payload = quizSchema.parse(req.body);
    const quiz = await prisma.quizAnswers.create({
      data: {
        userId: req.user!.id,
        preferences: payload.preferences,
        event: payload.event,
        budgetMin: payload.budgetMin,
        budgetMax: payload.budgetMax,
        notes: payload.notes
      }
    });
    res.status(201).json(quiz);
  } catch (error) {
    next(error);
  }
});

router.get('/', authenticate(), async (req, res, next) => {
  try {
    const quizzes = await prisma.quizAnswers.findMany({ where: { userId: req.user!.id } });
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
});

export default router;
