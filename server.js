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

app.get('/api/v1/projects/:id', (req, res) => {
  database('projects').where('id', req.params.id).select()
    .then(project => {
      if(!project.length) return sendNotFound(res, `Project with id ${req.params.id} not found.`);
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.get('/api/v1/projects/:id/palettes', (req, res) => {
  database('palettes').where('project_id', req.params.id).select()
    .then(palettes => {
      if(!palettes.length) return sendNotFound(res, `No palette associated with project id of ${req.params.id} is found.`);
      res.status(200).json(palettes)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.post('/api/v1/projects/', (req, res) => {
  const project = req.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) { 
      return res.status(422).send({error: `Expected format: { name: <string> }. You're missing ${requiredParameter}.`})
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      res.status(201).json({ id: project[0] })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.post('/api/v1/projects/:id/palettes', (req, res) => {
  const palette = req.body;
   
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5']) {
    if (!palette[requiredParameter]) {
      return res.status(422).send({
        error: `Expected format: { 
          palette_name: <string>, 
          color_1: <string>, 
          color_2: <string>, 
          color_3: <string>, 
          color_4: <string>, 
          color_5: <string>,  
        },
        You're missing ${requiredParam}.`
      })
    }
  }

  database('palettes').insert({...palette, project_id: req.params.id}, 'id') 
    .then(palette => {
      res.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.put('/api/v1/projects/:id', (req, res) => {
  const { name } = req.body
  database('projects').where('id', req.params.id).update({ name })
    .then(project => {
      if(!project) return sendNotFound(res, `No project with id ${req.params.id} was found.`)
      res.status(201).json(`Project with id ${req.params.id} has been updated.`)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

app.put('/api/v1/projects/:id/palettes', (req, res) => {
  const { palette_name, color_1, color_2, color_3, color_4, color_5 } = req.body
  database('palettes').where('project_id', req.params.id)
    .update({ 
      palette_name, 
      color_1, 
      color_2, 
      color_3, 
      color_4, 
      color_5 
    })
    .then(palette => {
      if(!palette) return sendNotFound(res, `No palette with id ${req.params.id} was found.`)
      res.status(201).json(`Palette associated with project id ${req.params.id} has been updated.`)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})
