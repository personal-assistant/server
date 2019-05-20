const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      expect    = chai.expect,
      assert    = chai.assert,
      app       = require('../app')

const {readFileSync} = require('fs')



chai.use(chaiHttp)

describe('Action Test', function() {
  var token;
  this.timeout(10000)
  it("Login User", function(done){
    let user = {
      "email": "coba@email.com",
      "password": "12345",
    }
    chai
      .request(app)
      .post("/users/login")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['token','user']);
          expect(res.body.user).to.have.keys(['_id','name', "email", "password", "expoNotificationToken", "relationshipPoint"]);
          token = res.body.token
          done();
      })
  })
  describe("Movie action", function(){
    it("should get result with code 200", function(done){

      let body = {
        code:"movie"
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['data','message', 'code']);
          expect(res.body.message).to.equal('success');
          done();
      })
    })
    it("should error code 500", function(done){

      let body = {
        code:"movie",
        test: true
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.all.keys('error','message',"source","statusCode");   
          done();
      })
    })
  })
  describe("Food action", function(){
    it("should get result with code 200", function(done){

      let body = {
        code:"food"
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['data','message', 'code']);
          expect(res.body.message).to.equal('success');
          done();
      })
    })
    it("should get result with code 200 latlong", function(done){

      let body = {
        code:"food",
        payload : {
          lat : -6.260697,
          long :  106.781616
        }
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['data','message', 'code']);
          expect(res.body.message).to.equal('success');
          done();
      })
    })
    it("should get result with code 200 latlong undefined", function(done){

      let body = {
        code:"food",
        payload : {
          lat : null,
          long :  null
        }
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['data','message', 'code']);
          expect(res.body.message).to.equal('success');
          done();
      })
    })
  })
  describe("photo action", function(){
    let file = readFileSync("./test/rendang.jpg")
    // let fileDummy = readFileSync("./test/rendangs.jpg")
    it("should get result with code 200", function(done){
      
      chai
      .request(app)
      .post("/action")
      .set({authorization: token})
      .attach("photo", file, "rendang.jpg")
      .field("code", "photo")
      .end(function(err,res){
          // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['data','message', 'code', "imageUrl"]);
          expect(res.body.message).to.equal('success');
          
          done();
      })
    })
    it("should error code 500", function(done){
      chai
      .request(app)
      .post("/action")
      .set({authorization: token})
      .attach("photo", file, "rendang.jpg")
      .field("code", "photo")
      .field("test", "catch")
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.all.keys('error','message',"source","statusCode");   
          done();
      })
    })
    // it("should error code 500", function(done){
    //   chai
    //   .request(app)
    //   .post("/action")
    //   .set({authorization: token})
    //   .attach("photo", file, "rendang.jpg")
    //   .field("code", "photo")
    //   .field("test", "stream")
    //   .end(function(err,res){
    //     console.log(res.body)
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(500);
    //       expect(res.body).to.be.an("object")
    //       expect(res.body).to.have.all.keys('error','message',"source","statusCode");   
    //       done();
    //   })
    // })

  })
  describe("relationship Poin action", function(){

    it("should success update user result point 200", function(done){

      let body = {
        relationshipPoint : 2
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['relationshipPoint',"message"]);
          expect(res.body.message).to.equal('success');  
          done();
      })
    })
    it("should failed update user result point 400", function(done){

      let body = {
        relationshipPoint : "a"
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
          // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.all.keys('error','message',"source","statusCode");          
          done();
      })
    })
  })
  describe("Other test", function(){
    it("send requset without token", function(done){
      let body = {
        code: "movie"
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(body)
      .end(function(err,res){
        // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.equal("Token is undefined")
          expect(res.body).to.have.keys(['message', 'statusCode', 'source', 'error']);
          done();
      })
    })
    it("send requset with wrong token", function(done){
      let body = {
        code: "movie"
      }
      let tokenFalse = 'gyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RmYjA5MjMzMzVjOTdhMWUyMjI4NjgiLCJlbWFpbCI6InRlc3RpbmdAZW1haWwuY29tIiwiaWF0IjoxNTU4MTYzNzQ3fQ.yUs7w-nkgSOdpsoIT9GBvMFOcyaDfjrfNe8cl7SGG1s'
      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', tokenFalse)
      .send(body)
      .end(function(err,res){
        // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(403);
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.equal("Token is Invalid")
          expect(res.body).to.have.keys(['message', 'statusCode', 'source', 'error']);
          done();
      })
    })
    it("send requset with invalid code", function(done){
      let body = {
        code: "asapocj"
      }

      chai
      .request(app)
      .post("/action")
      .set('content-type', 'application/x-www-form-urlencoded')
      .set('authorization', token)
      .send(body)
      .end(function(err,res){
        // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.keys(['message', 'statusCode', 'source', 'error']);
          done();
      })
    })
  })
})