const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
import request from 'supertest';
import app from './app';
import mockData from './mockData'

describe('/api/v1', () => {
  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /projects', () => {
    it('should return all projects')
    //Liz
  })

  describe('GET /palettes', () => {
    it('should return all palettes', async () => {
      const expectedPalettesNumber = palettes.length

      const response = await request(app).get('/api/v1/palettes')
      const result = response.body

      expect(response.status).toBe(200)
    })
  })

  describe('GET /projects/:id', () => {
    it('should get a specific project by id')
    //Liz
  })

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
    it('should delete a project')
    //Liz
  })

  describe('DELETE /palettes/:id', () => {
    it('should delete a palette')
    //Taylor
  })
})