import { createClient } from 'redis';
import express from 'express';

const port = process.env.PORT || '3000'
const redis_port = process.env.REDIS_PORT || '6379'
const redis_host = process.env.REDIS_HOST || 'localhost'

const db = await createClient({
  url: `redis://${redis_host}:${redis_port}`
}).on('error', err => console.log('Redis Client Error', err))
  .connect();

const app = express();

app.get('/health', (_req, res) => {
  res.send({
    status: "green"
  });
});

app.post('/users', (req, res) => {
  // TODO: save user
})

app.get('/users/:id', (req, res) => {
  // TODO: return user with :id
})

app.listen(port, () => console.log(`App is listening on port ${port}.`));
