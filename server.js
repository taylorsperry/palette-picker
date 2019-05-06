const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(express.json());

app.listen(app.get('port'), () => console.log(`App is running on localhost: ${app.get('port')}`));

function sendNotFound(res, message) {
  return res.status(404).json(message)
}

app.get('/api/v1/projects', (req, res) => {
  database('projects').select()
    .then((projects) => {
      if(!projects) return sendNotFound(res, 'No saved projects were found.');
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).json({ error })
    });
});

app.get('/api/v1/palettes', (req, res) => {
  database('palettes').select()
    .then((palettes) => {
      if(!palettes) return sendNotFound(res, 'No saved palettes were found.');
      res.status(200).json(palettes);
    })
    .catch((error) => {
      res.status(500).json({ error })
    });
});