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
  });

  describe('GET /projects/:id/palettes', () => {
    it('should get all of the palettes for a specific project', async () => {
      const project = await database('projects').first()
      const id = project.id
  
      const response = await request(app).get(`/api/v1/projects/${id}/palettes`)
      const palettes = await database('palettes').where('project_id', id)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(palettes.length)
    })
  })

  describe('POST /projects', () => {
    it('should post a new project', async () => {
      const newProject = { name: 'My First Project' }
  
      const response = await request(app).post(`/api/v1/projects`).send(newProject)
      const projects = await database('projects').where('id', response.body.id).select()

      expect(response.status).toBe(201)
      expect(projects[0].name).toBe(newProject.name)
    })
  })

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
    })
    
  })

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
  })

  describe('DELETE /projects/:id', () => {
    it('should delete a project')
    //Liz
  })

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette')
    //Taylor
  })
})