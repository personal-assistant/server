const chai = require("chai");
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const User = require("../models/user")

chai.use(chaiHttp);
var token;

describe("User tests", function () {
    this.timeout(10000);
    before(function(done) {
        User
          .deleteMany({
              _id:{
                  $nin: ["5ce29f01adb77d52a6740f76" ]
              }
          })
          .then(function() {
            done();
          })
          .catch(function(err) {
            done(err)
          });
    });
      
    after(function(done) {
        User
          .deleteMany({
              _id:{
                  $nin: ["5ce29f01adb77d52a6740f76" ]
              }
          })
          .then(function() {
            done();
          })
          .catch(function(err) {
         
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
            .set('content-type', 'application/json')
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
            .set('content-type', 'application/json')
            .send(errorUser)
            .end(function(err, res){
                // console.log(res.body)
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.have.all.keys('error','message',"source","statusCode");
                expect(res.body.message).to.include('validation')
                done()
            })
        })
    });

    describe("POST /users/login", function(){
        it("Success login: should respon with token, user", function(done){
            let user = {
                "email": "test@email.com",
                "password": "12345",
                "expoNotificationToken": "dummyToken2"
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
                done();
            })
        })
        it("Success login: with new device", function(done){
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
        it("Success login: should respon with token, user", function(done){
            let user = {
                "email": "coba@email.com",
                "password": "12345",
                "expoNotificationToken": "dummyToken2"
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
    });
    describe('Other test', function(){
        this.timeout(10000)
        it("should success get user", function(done){
            chai
            .request(app)
            .get("/users/user")
            .set('authorization', token)
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
      it("should error", function(done){
        let user = {
            email: "test@email.com",
            password: "12345",   
            expoNotificationToken: "dummy"
        };

        let testToken;

        chai
        .request(app)
        .post("/users/login")
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(user)
        .then(res=>{
            expect(res).to.have.status(200);
            testToken = res.body.token;
            user = res.body.user;
            // console.log("perform delete user")
           return User.findByIdAndDelete(user._id)
        })
        .then((result)=>{
            
            let dataSend = {
                relationshipPoint: 2
            }

            var requester = chai.request(app).keepOpen()
            return Promise.all([
                requester.post("/action").set('content-type', 'application/x-www-form-urlencoded').set('authorization', testToken).send(dataSend)
            ])
        })
        .then(([res1])=>{
            expect(res1).to.have.status(403);
            expect(res1.body).to.have.all.keys('error','message',"source","statusCode");
            done()
        })
        .catch(err=>{
            done(err)
        })
        
      })
    })
    
   
});