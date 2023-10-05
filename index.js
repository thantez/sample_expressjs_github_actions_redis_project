const express = require('express');

const app = express();

app.get('/health', (_req, res) => {
  // TODO: return green status
});

app.post('/users', (req, res) => {
  // TODO: save user
})

app.get('/users/:id', (req, res) => {
  // TODO: return user with :id
})
