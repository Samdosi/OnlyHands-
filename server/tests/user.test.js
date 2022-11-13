//const {createUser, login} = require('../controllers/user')
// const mongoose = require("mongoose");
// require('dotenv').config();
// const sinon = require("sinon");
// const {User} = require('../schemas/User');

const expect = require("chai").expect;
const request = require('supertest');
const app = require('../routes/user')
const conn = require('../index')

describe('Test for the user registration POST /', ()=>{
  before((done)=>{
    conn.connect().then(()=> done()).catch((err)=>done(err));
  })
  after((done)=>{
    conn.close().then(()=> done()).catch((err)=>done(err));
  })

  it('OK, creating a new user test', (done)=>{
    request(app).post('/').send({
      username: "red",
      password : "2Ui6Dz8Qh",
      email: "danielaostos17@gmail.com"
    }).then((res)=>{
      const body = res.body;
      expect(body).to.contain.property('status');
      done();
    })
  })
})

// //const db = require('./db');
// mongoose.connect(
//     process.env.DATABASE_URI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }
// );
    
// const db = mongoose.connection;
// db.once("open", () => {
// console.log("Connected successfully");
// });
// db.on("error", console.error.bind(console, "connection error: "));

//user registartion
// describe("User registration unit tests", function () {
//     this.afterEach(() => {
//         sinon.restore();
//     })
//     describe("Save User functionality", function () {
//         it("should successfully add a user if the number of users in the DB with the same username is zero", async function(){
//             const username = "fiore";
//             const password = '12345678'
//             const email = "danielaostos@gmail.com";

//             sinon.stub(User, "countDocuments").returns(0);
//             sinon.stub(User.prototype, "save").returns({
//                 username, email });

//             await createUser({username, password, email});
//             const fakeUser = {
//                 username : username,
//                 password : password,
//                 email : email,
//                 isVerified : true
//             }

//             sinon.stub(User, 'findOne').returns(fakeUser);
//             const returnedUser = await User.findOne({username});
//             expect(returnedUser.username).to.equal(username);
//             expect(returnedUser.email).to.equal(email);
//         });
//       it("should throw an error if the number of users with the same username is not zero", async function () {
//         const username = "fiore";
//         const password = '12345678'
//         const email = "danielaostos@gmail.com";
//         sinon.stub(User, 'countDocuments').returns(1);
//         await createUser({username, password, email}).catch((error)=>{
//             expect(error.message).to.equal("E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"fiore\" }");
//         });
//       });
//     });
//   });

//user login
// describe("User login unit tests", function () {
//     this.afterEach(() => {
//         sinon.restore();
//       })
//     describe("Get User functionality", function () {
//         it("should successfully return user if already registered", async done=>{
//             const username = "fiore";
//             const password = '12345678';
//             const fakeUser = {
//                 username : username,
//                 password : password,
//                 isVerified : true
//             }
//             sinon.stub(User, 'countDocuments').returns(1);
//             sinon.stub(User, 'findOne').returns(fakeUser);

//             const returnedUser = await login({username, password});
//             expect(returnedUser.username).to.equal(username);
//             done();
          
//         });
//       it("should give error if invalid if there is no user found with provided username and password", async function () {
        
//         const username = "fiore";
//         const password = '12345678'
//         sinon.stub(User, 'countDocuments').returns(0);
//         sinon.stub(User, 'findOne').returns(null);
//         await login({username, password}).catch((error)=>{
//             expect(error.message).to.equal("User does not exist!");
//         });
//     });
//     });
//     });