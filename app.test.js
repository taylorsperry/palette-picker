const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
import request from 'supertest';
import '@babel/polyfill';
const app = require('./app');
const mockData = require('./mockData');

describe('/api/v1', () => {
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /projects', () => {
    it('should return all projects', async () => {
      const expectedProjectsNumber = mockData.length;

      const response = await request(app).get('/api/v1/projects');
      const result = response.body;

      expect(response.status).toBe(200);
      expect(result.length).toBe(expectedProjectsNumber)
    })
  })

  describe('GET /palettes', () => {
    it('should return all palettes', async () => {
      const allPalettes = await database('palettes').select()
      const response = await request(app).get('/api/v1/palettes')
      const result = response.body

      expect(response.status).toBe(200)
      expect(result.length).toBe(allPalettes.length)
    });
  });

  describe('GET /projects/:id', () => {
    it('should get a specific project by id', async () => {
      const project = await database('projects').first();
      const response = await request(app).get(`/api/v1/projects/${project.id}`)
      const result = response.body;

      expect(response.status).toBe(200);
      expect(result[0].id).toEqual(project.id)
    });

    it('should send a 404 error if the project does not exist', async () => {
      const response = await request(app).get('/api/v1/projects/999')
      const expectedMsg = "\"Project with id 999 not found.\""

      expect(response.status).toBe(404)
      expect(response.text).toBe(expectedMsg)
    })
  });

  describe('GET /projects/:id/palettes', () => {
    it('should get all of the palettes for a specific project', async () => {
      const project = await database('projects').first()
      const id = project.id
  
      const response = await request(app).get(`/api/v1/projects/${id}/palettes`)
      const palettes = await database('palettes').where('project_id', id)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(palettes.length)
    });

    it('should return a 404 if palette does not exist', async () => {
      const response = await request(app).get('/api/v1/projects/999/palettes');
      const expectedMsg = "\"No palette associated with project id of 999 is found.\""

      expect(response.text).toBe(expectedMsg);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /projects', () => {
    it('should post a new project', async () => {
      const newProject = { name: 'My First Project' };
  
      const response = await request(app).post(`/api/v1/projects`).send(newProject);
      const projects = await database('projects').where('id', response.body.id).select();

      expect(response.status).toBe(201);
      expect(projects[0].name).toBe(newProject.name);
    });

    it('should return 422 if req.body is missing name', async () => {
      const newProject = { name: '' };
      const expectedMsg = "{\"error\":\"Expected format: { name: <string> }. You're missing name.\"}"
      
      const response = await request(app).post('/api/v1/projects').send(newProject);
      
      expect(response.status).toBe(422);
      expect(response.text).toBe(expectedMsg);
    });
  });

  describe('POST /projects/:id/palettes', () => {
    it('should post a new palette with the correct project_id', async () => {
      const firstProject = await database('projects').first()

      const newPalette = { 
                          palette_name: 'My palette', 
                          color_1: 'yellow',
                          color_2: 'blue',
                          color_3: 'orange',
                          color_4: 'green',
                          color_5: 'red'
                        }

      const response = await request(app).post(`/api/v1/projects/${firstProject.id}/palettes`).send(newPalette)
      
      const addedPalette = await database('palettes').where('id', response.body.id)

      expect(response.status).toBe(201)
      expect(addedPalette[0].project_id).toEqual(firstProject.id)
    });

    it('should return 422 if req.body is missing name', async () => {
      const project = await database('projects').first()
      const newPalette = { palette_name: '' };
      
      const response = await request(app).post(`/api/v1/projects/${project.id}/palettes`).send(newPalette);
      
      expect(response.status).toBe(422);
    });
  });

  describe('PUT /projects/:id', () => {
    it('should update a project', async () => {
      const existingProject = await database('projects').first()
      const id = existingProject.id
      const updatedProject = { name: 'New Name'}

      const response = await request(app).put(`/api/v1/projects/${id}`).send(updatedProject)

      const checkProject = await database('projects').where('id', id)

      expect(response.status).toBe(201)
      expect(checkProject[0].name).toEqual(updatedProject.name)
    })
    
    it('should send a 404 if a project does not exist', async () => {
      const updatedProject = { name: 'New Name'}
      const response = await request(app).put('/api/v1/projects/999').send(updatedProject)
      const expectedMsg = "\"No project with id 999 was found.\""

      expect(response.status).toBe(404)
      expect(response.text).toBe(expectedMsg)
    })
  })

  describe('PUT /palettes/:id', () => {
    it('should update a palette', async () => {
      const existingPalette = await database('palettes').first()
      const id = existingPalette.id
      const updatedPalette = {
                          palette_name: 'I have a new name!', 
                          color_1: 'yellow',
                          color_2: 'blue',
                          color_3: 'orange',
                          color_4: 'green',
                          color_5: 'red'
                        }
      const response = await request(app).put(`/api/v1/palettes/${id}`).send(updatedPalette)

      const checkPalette = await database('palettes').where('id', id)
      
      expect(response.status).toBe(201)
      expect(checkPalette[0].palette_name).toEqual(updatedPalette.palette_name)
    })

    it('should send a 404 if the palette is not found', async () => {
      const updatedPalette = {
                                palette_name: 'I have a new name!', 
                                color_1: 'yellow',
                                color_2: 'blue',
                                color_3: 'orange',
                                color_4: 'green',
                                color_5: 'red'
                              }

      const response = await request(app).put('/api/v1/palettes/999').send(updatedPalette)
      const expectedMsg =  "\"No palette with id: 999 was found.\""

      expect(response.status).toBe(404)
      expect(response.text).toBe(expectedMsg)
    })
  })

  describe('DELETE /projects/:id', () => {
    it('should delete the correct project', async () => {
      const originalProjects = await database('projects').select();
      const projectToDelete = await database('projects').first();
      const response = await request(app).delete(`/api/v1/projects/${projectToDelete.id}`);
      
      const newProjects = await database('projects').select();
      const newPalettes = await database('palettes').where('project_id', projectToDelete.id)

      expect(response.status).toBe(200);
      expect(newProjects.length).toBe(originalProjects.length - 1);
      expect(newPalettes.length).toBe(0);
    });

    it('should send a 404 error if the project does not exist', async () => {
      const response = await request(app).delete('/api/v1/projects/999')
      const expectedMsg = "\"Project with id: 999 was not found.\""

      expect(response.status).toBe(404)
      expect(response.text).toBe(expectedMsg)
    })

  });

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette', async () => {
      const originalPalettes = await database('palettes').select();
      const expectedPalette = await database('palettes').first();
      await request(app).delete(`/api/v1/palettes/${expectedPalette.id}`);

      const newPalettes = await database('palettes').select();
      expect(newPalettes.length).toBe(originalPalettes.length - 1)
    });

    it('should send a 404 error if the palette does not exist', async () => {
      const response = await request(app).delete('/api/v1/palettes/999')
      const expectedMsg = "\"Palette with id: 999 was not found.\""

      expect(response.status).toBe(404)
      expect(response.text).toBe(expectedMsg)
    })
  });

  //testing a commit for Travis CI
});