const chai = require("chai");;
const assert = chai.assert
const expect = chai.expect;
const app = require('../app');
const User = require("../models/user")
const databaseConnect = require("../helpers/databaseConnect")
const mongoose = require("mongoose")

describe("Database connection testing", function(){
    it("should failed connecting to database and return false", function(){
        var success = databaseConnect(mongoose, "adminPalsu", "psswordPalsu", "test")
        assert(success, false)
    })
})