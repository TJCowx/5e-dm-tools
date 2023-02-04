import dbConnect from 'db/dbConnect';
import Creature from 'models/creature/Creature';
import { NextApiRequest, NextApiResponse } from 'next';
import { mapCreatureDoc } from 'utils/creatureUtils';
import { logMessage } from 'utils/logUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const creature = await Creature.findById(query.creatureId);

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
      break;
    case 'PUT':
      try {
        await Creature.findByIdAndUpdate(body.id, body);
        res.status(200).json({ success: true });
      } catch (e) {
        logMessage('error', e);
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        await Creature.deleteOne({ _id: query.creatureId });
        res.status(200).json({ success: true });
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
