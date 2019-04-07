import express from 'express';
import logger from 'morgan';

import router from './routes';

const app = express();

app.use(express.json());
app.use(logger());

app.use('/api/v1', router);

const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log('server is running on port 3300');
});
