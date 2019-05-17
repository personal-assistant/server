const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      app       = require('../app')

chai.use(chaiHttp)

describe('Movie Test', function() {
  it('should return now playing movies with status code 200', function(done) {
    chai
      .request(app)
      .get('/movies')
      .end(function(err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})