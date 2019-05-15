const express = require('express');
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
// TravisCI
const app = express();

app.use(express.json());
app.use(cors());

function sendNotFound(res, message) {
  return res.status(404).json(message)
}

app.get('/api/v1/projects', (req, res) => {
  var name = req.query.name
  console.log(req.query)
  database('projects').select()
    .then((projects) => {
      if (name) {
        const projectName = projects.find(project => name === project.name)
        if (projectName) {
          res.status(200).json(projectName);
        } else {
          res.status(404).json('That project does not exist')
        }
      } 
      res.status(200).json(projects);
    })
    .catch((error) => {
      res.status(500).send({ error })
    });
});

app.get('/api/v1/palettes', (req, res) => {
  database('palettes').select()
    .then((palettes) => {
      res.status(200).json(palettes);
    })
    .catch((error) => {
      res.status(500).send({ error })
    });
});

app.get('/api/v1/projects/:id', (req, res) => {
  database('projects').where('id', req.params.id).select()
    .then(project => {
      if(!project.length) return sendNotFound(res, `Project with id ${req.params.id} not found.`);
      res.status(200).json(project)
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

app.get('/api/v1/projects/:id/palettes', (req, res) => {
  database('palettes').where('project_id', req.params.id).select()
    .then(palettes => {
      if(!palettes.length) return sendNotFound(res, `No palette associated with project id of ${req.params.id} is found.`);
      res.status(200).json(palettes)
    })
    .catch(error => {
      res.status(500).send({ error })
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
    .then(projectIds => {
      res.status(201).json({ id: projectIds[0] })
    })
    .catch(error => {
      res.status(500).send({ error })
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
        You're missing ${requiredParameter}.`
      })
    }
  }

  database('palettes').insert({...palette, project_id: req.params.id}, 'id') 
    .then(paletteIds => {
      res.status(201).json({ id: paletteIds[0] })
    })
    .catch(error => {
      res.status(500).send({ error })
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
      res.status(500).send({ error })
    })
})

app.put('/api/v1/palettes/:id', (req, res) => {
  const { palette_name, color_1, color_2, color_3, color_4, color_5 } = req.body
  database('palettes').where('id', req.params.id)
    .update({ 
      palette_name, 
      color_1, 
      color_2, 
      color_3, 
      color_4, 
      color_5 
    })
    .then(palette => {
      if(!palette) return sendNotFound(res, `No palette with id: ${req.params.id} was found.`)
      res.status(201).json(`Palette with id: ${req.params.id} has been updated.`)
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

app.delete('/api/v1/projects/:id', (req, res) => {
  const { id } = req.params;
  database('palettes').where('project_id', id).del()
    .then(rows => {
      database('projects').where('id', id).del()
        .then(result => {
          if(result > 0) {
            res.status(200).json(`Project with id: ${id} and its associated palettes have been deleted.`)
          } else {
            res.status(404).json(`Project with id: ${id} was not found.`)
          }
        })
    })
    .catch(error => {
      res.status(500).send({ error })
    })
});

app.delete('/api/v1/palettes/:id', (req, res) => {
  const { id } = req.params;
  database('palettes').where('id', id).del()
    .then(result => {
      if(result > 0) {
        res.status(200).json(`Palette with id: ${id} has been deleted.`)
      } else {
        res.status(404).json(`Palette with id: ${id} was not found.`)
      }
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

module.exports = app;