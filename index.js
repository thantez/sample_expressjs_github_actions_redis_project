const express = require('express');

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

const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`App is listening on port ${port}.`));
