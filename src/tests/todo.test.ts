import request from 'supertest'
import app from '../app'

describe('Todo API', () => {
  it('should fetch todos', async () => {
    const response = await request(app).get('/api/todos')

    expect(response.status).toBe(200)
  })
})