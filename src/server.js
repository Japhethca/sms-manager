import express from 'express';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => res.status(200).json({ message: 'SMS API' }));

app.listen(3300, () => {
  console.log('server is running on port 3300');
});
