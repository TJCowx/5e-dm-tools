import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'db/dbConnect';
import Monster from 'models/monster/Monster';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const monsters = await Monster.find({});
        res.status(200).json({ success: true, data: monsters });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const monster = await Monster.create(req.body);
        res.status(201).json({ success: true, data: monster });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

export default handler;
