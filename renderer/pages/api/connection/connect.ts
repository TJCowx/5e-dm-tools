import { init } from 'db/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { logMessage } from 'utils/logUtils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        await init(req.body.connectionString);
        res.status(200).json({ success: true });
      } catch (e) {
        logMessage('error', e);
        res.status(500).json({ success: false, data: 'Unable to connect' });
      }
      break;
    default:
      res.status(404);
  }
};

export default handler;
