const chai = require("chai");;
const assert = chai.assert
const expect = chai.expect
const databaseConnect = require("../helpers/databaseConnect")
const mongoose = require("mongoose")
const errorHandling = require("../helpers/errorhandling")
const axios = require('axios')

describe("error handling test", function(){
    this.timeout(10000)
    it("should return code 500", function(done){
        let error =  errorHandling(new mongoose.Error("message"))

        expect(error.statusCode).to.equal(500)
        expect(error.source).to.equal('database')
        expect(error.message).to.equal('Error from server')
        expect(error)  
        done()
     })
     it("should return code 500", function(done){
        let error =  errorHandling(new mongoose.Error.ValidationError(null))
        expect(error.statusCode).to.equal(400)
        expect(error.source).to.equal('database')
        expect(error)  
        done()
     })
     it("should return code 500", function(done){
        axios({
            method:"get",
        })
        .catch(err=>{
            let error = errorHandling(err);
            expect(error.statusCode).to.equal(500)
            done()
        })
     })
     it("should return code 500", function(done){
        let error =  errorHandling(new Error("test"))

        expect(error.statusCode).to.equal(500)
        expect(error.source).to.equal('node')
        expect(error.message).to.equal('test')
        done()
     })
})
describe("Database connection testing", function(){
    this.timeout(10000)

    it("should failed connecting to database and return false", function(done){
        databaseConnect(mongoose, "adminPalsu", "psswordPalsu", "test")
        .then(result=>{
            expect(result).to.equal(false)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
    it("should success connecting to database and return true passing undefined NODE_ENV", function(done){
        databaseConnect(mongoose, process.env.ATLAS_USER, process.env.ATLAS_PASSWORD)
        .then(result=>{
            expect(result).to.equal(true)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
    
})
