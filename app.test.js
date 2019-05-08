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
    it('should get all of the palettes for a specific project')
    //Taylor
  })

  describe('POST /projects', () => {
    it('should post a new project')
    //Liz
  })

  describe('POST /projects/:id/palettes', () => {
    it('should post a new palette with the correct project_id')
    //Taylor
  })

  describe('PUT /projects/:id', () => {
    it('should update a project')
    //Liz
  })

  describe('PUT /palettes/:id', () => {
    it('should update a palette')
    //Taylor
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

  });

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette', async () => {
      const originalPalettes = await database('palettes').select();
      const expectedPalette = await database('palettes').first();
      await request(app).delete(`/api/v1/palettes/${expectedPalette.id}`);

      const newPalettes = await database('palettes').select();
      expect(newPalettes.length).toBe(originalPalettes.length - 1)
    });
  });
});