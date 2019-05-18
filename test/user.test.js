const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require("../models/user")

chai.use(chaiHttp);
var token;

describe("User tests", function () {
    this.timeout(5000);
    before(function(done) {
        User
          .deleteMany({
              _id:{
                  $nin: ["5cde8a90d3f5935b75012395" ]
              }
          })
          .then(function() {
            console.log('UDAH')
            done();
          })
          .catch(function(err) {
            console.log(err)
            done(err)
          });
    });
      
    after(function(done) {
        User
          .deleteMany({
              _id:{
                  $nin: ["5cde8a90d3f5935b75012395" ]
              }
          })
          .then(function() {
            done();
          })
          .catch(function(err) {
            console.log(err)
            done(err)
          });
    });
    describe(" POST /users/register", function () {
        it("should success register user with status 201 with no error", function (done) {
            let user = {
                name: "test",
                email: "test@email.com",
                password: "12345",
                expoNotificationToken: "dummyToken"
            };
   
            chai
            .request(app)
            .post("/users/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an("object")
                expect(res.body.user).to.be.an("object")
                expect(res.body.user.name).to.equal(user.name)
                expect(res.body).to.have.keys(['token','user']);
                expect(res.body.user).to.have.keys(['_id','name', "email", "password", "expoNotificationToken", "relationshipPoint"]);
                done()
            })
        });
        it("should error with error code 400", function(done){
            let errorUser ={}
            chai
            .request(app)
            .post("/users/register")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(errorUser)
            .end(function(err, res){
        
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                expect(res.body.message).to.include('validation')
                done()
            })
      
        })
    });

    describe("POST /users/login", function(){
        it("Success login: should respon with token, name, imgSrc", function(done){
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
        it("Login Failed: wrong email with status 400", function(done){
            let user = {
                "email": "random@email.com",
                "password": "12345",
            }
            chai
            .request(app)
            .post("/users/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .end(function(err,res){ 
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Email is Invalid!")
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                done();
            })
     
        })
        it("Login Failed: wrong password with status 400", function(done){
            let user = {
                "email": "coba@email.com",
                "password": "pas",
            }
            chai
            .request(app)
            .post("/users/login")
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(user)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("Password is Invalid!")
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                done();
            })
        })
        //soon to be delete and replace with real backend
        it("successfully post message", function(){

            let message = {
                code: "food",
                relationshipPoint : 0,
                payload : {}
            }

            chai
            .request(app)
            .post("/messages")
            .set({authorization: token})
            .send(message)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object")
                expect(res.body.message).to.equal("success")
            })
        })
        it("should get 401 passing data without token", function(){
            let message = {
                code: "food",
                relationshipPoint : 0,
                payload : {}
            }
            chai
            .request(app)
            .post("/messages")
            .send(message)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(401);
            })
        })

    });
   
});