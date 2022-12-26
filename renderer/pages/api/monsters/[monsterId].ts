import dbConnect from 'db/dbConnect';
import Monster from 'models/monster/Monster';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        await Monster.findByIdAndUpdate(body.id, body);
        res.status(200).json({ success: true });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        await Monster.deleteOne({ id: query.monsterId });
        res.status(204).json({ success: false });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(404);
  }
};

export default handler;
