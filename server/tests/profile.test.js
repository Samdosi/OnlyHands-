const {create_profile, get_profile} = require('../controllers/profile')
const {expect} = require("chai");
const mongoose = require("mongoose");
require('dotenv').config();
const sinon = require("sinon");
const {Profile} = require('../schemas/Profile');
const {User} = require('../schemas/User');

describe("Profile creation unit tests", function () {
    this.afterEach(() => {
        sinon.restore();
    })
    describe("Create profile functionality", function () {
        it("should succefully create user's profile if none exists", async function(){
            const firstName = "fiore";
            const lastName = "barney";
            const gender = "female";
            const age = 16;
            const height = "5'9";
            const weight = 150;
            const _id = 1;

            sinon.stub(Profile, "countDocuments").returns(0);
            sinon.stub(Profile.prototype, "save").returns({
                firstName, lastName, gender, age, height, weight, _id });

            await create_profile({firstName, lastName, gender, age, 
                                height, weight, _id});

            const fakeProfile = {
                firstName : firstName,
                lastName : lastName,
                 gender :gender,
                 age : age,
                 height : height,
                 weight : weight,
                 _id: _id
            }

            sinon.stub(User, 'findById').returns(fakeProfile);
            const returnedUser = await Profile.findOne({firstName});
            expect(returnedUser.firstName).to.equal(firstName);
            expect(returnedUser.lastName).to.equal(lastName);
        });
    //   it("should throw an error if the number of users with the same username is not zero", async function () {
    //     const username = "fiore";
    //     const password = '12345678'
    //     const email = "danielaostos@gmail.com";
    //     sinon.stub(User, 'countDocuments').returns(1);
    //     await createUser({username, password, email}).catch((error)=>{
    //         expect(error.message).to.equal("E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"fiore\" }");
    //     });
      //});
    });
  });