import { createClient } from 'redis'
import express from 'express'
import morgan from 'morgan'

const port = process.env.PORT || '3000'
const redis_port = process.env.REDIS_PORT || '6379'
const redis_host = process.env.REDIS_HOST || 'localhost'

const db = await createClient({
  url: `redis://${redis_host}:${redis_port}`
}).on('error', err => console.log('Redis Client Error', err))
  .connect()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.send({
    status: "green"
  })
})

app.post('/users/:id', async (req, res) => {
  const id = req.params.id || ""
  const username = req.body.username || ""
  const password = req.body.password || ""
  if (id == "" || username == "" || password == "") {
    return res.sendStatus(500)
  }

  await db.hSet(`user:${id}`, {
    username,
    password
  })
  return res.sendStatus(200)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id || ""
  if (id == "") {
    return res.sendStatus(500)
  }

  const user = await db.hGetAll(`user:${id}`)
  if(Object.keys(user).length == 0) {
    return res.sendStatus(404)
  }

  return res.send(user)
})

app.listen(port, () => console.log(`App is listening on port ${port}.`))
