import express from 'express';
import logger from 'morgan';

import router from './routes';

const server = express();

server.use(express.json());
server.use(logger('tiny'));

server.use('/api/v1', router);
server.get('*', (req, res) => res
  .status(404)
  .json({ message: 'The route you are trying to access does not exist' }));

const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log('server is running on port 3300');
});

export default server;
