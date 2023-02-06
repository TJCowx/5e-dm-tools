import Creature from 'models/creature/Creature';
import { mapCreatureDoc } from '@shared-utils/creatureUtils';
import { logMessage } from 'utils/logUtils';
import express, { Request, Response } from 'express';
import { model } from 'mongoose';

import CreatureSchema from '../schema/CreatureSchema';

const router = express.Router();
const DbCreature = model<Creature>('Creature', CreatureSchema);

router.get('/creature', async (_, res: Response) => {
  try {
    const creatures = await DbCreature.find({});
    res.status(200).json({
      success: true,
      data: creatures.map((creature) => {
        const { _id: id, ...restOfCreature } = creature.toObject();
        return { ...restOfCreature, id };
      }),
    });
  } catch (e) {
    logMessage('error', e);
    res.status(400).json({ success: false });
  }
});

router.post('/creature', async (req: Request, res: Response) => {
  try {
    const creature = await DbCreature.create(req.body);
    res.status(201).json({ success: true, data: creature });
  } catch (e) {
    logMessage('error', e);
    res.status(400).json({ success: false });
  }
});

router.get('/creature/:creatureId', async (req: Request, res: Response) => {
  const { query } = req;
  try {
    const creature = await DbCreature.findById(query.creatureId);

    if (!creature) {
      logMessage(
        'error',
        `Creature with id ${query.creatureId} does not exist.`
      );
      res.status(404).json({ success: false });
    }

    res
      .status(200)
      .json({ success: true, data: mapCreatureDoc(creature.toObject()) });
  } catch (e) {
    logMessage('error', e);
    res.status(400).json({ success: false });
  }
});

router.put('/creature/:creatureId', async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await DbCreature.findByIdAndUpdate(body.id, body);
    res.status(200).json({ success: true });
  } catch (e) {
    logMessage('error', e);
    res.status(400).json({ success: false });
  }
});

router.delete('/creature/:creatureId', async (req: Request, res: Response) => {
  const { query } = req;

  try {
    await DbCreature.deleteOne({ _id: query.creatureId });
    res.status(200).json({ success: true });
  } catch (e) {
    logMessage('error', e);
    res.status(400).json({ success: false });
  }
});

export default router;
