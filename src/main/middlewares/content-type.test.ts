import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json ', async () => {
    app.get('/content_type', (req, res) => {
      res.send('')
    })
    await request(app)
      .get('/content_type')
      .expect('content-type', /json/)
  })

  test('should return forced content type as xml ', async () => {
    app.get('/content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get('/content_type_xml')
      .expect('content-type', /xml/)
  })
})
