import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'db/dbConnect';
import Creature from 'models/creature/Creature';
import { logMessage } from 'utils/logUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const creatures = await Creature.find({});
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
      break;
    case 'POST':
      try {
        const creature = await Creature.create(req.body);
        res.status(201).json({ success: true, data: creature });
      } catch (e) {
        logMessage('error', e);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(404);
  }
};

export default handler;
