import express, { Express } from 'express';

import connectionRoutes from './routes/connection';

const app: Express = express();
const port = 3500;
// const port = process.argv[2] || 3500;

app.use(connectionRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
