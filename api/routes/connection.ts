import express, { Request, Response } from 'express';
import { init } from '../db/dbConnect';

const router = express.Router();

router.post('/connection/connect', async (req: Request, res: Response) => {
  try {
    await init(req.body.connectionString);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, data: 'Unable to connect' });
  }
});

export default router;
