const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')

chai.use(chaiHttp)

describe('Resto Test', function() {
  it('should return all popular restaurants nearby with status code 200', function(done) {
    chai
      .request(app)
      .get('/resto')
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})