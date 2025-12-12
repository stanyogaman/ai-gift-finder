import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

const verifySignature = (payload: string, signature: string | undefined) => {
  if (!signature) return false;
  const secret = process.env.WEBHOOK_SIGNING_SECRET ?? 'development-secret';
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
};

router.post('/partner', (req, res) => {
  const rawBody = JSON.stringify(req.body ?? {});
  const signature = req.headers['x-awseen-signature'] as string | undefined;

  if (!verifySignature(rawBody, signature)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  // Process webhook payload for analytics fan-out
  res.status(202).json({ message: 'Webhook accepted' });
});

export default router;
