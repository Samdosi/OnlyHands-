// process.env.NODE_ENV = 'test';
// const mongoose = require('mongoose');
// const supertest = require('supertest');
// const {app, server} = require('../index');
// const request = supertest(app);
// const { connectDB, disconnectDB } = require('./db');
// const expect = require("chai").expect;
// const {User} = require('../schemas/User');
// require('dotenv').config();

// describe('User endpoint routes testing', () => {
 
//   before(async()=>{
//     connectDB();
//     //User.deleteMany({}, (err) => console.log(err));
//   })
//   after(async()=>{
//     //User.deleteMany({}, (err) => console.log(err));
//     disconnectDB();
//     server.close();
//   })

//   describe('POST/ create user', ()=>{
//     it('It should create new user succesfully',  async () => {
//       const res = await request.post('/api/user/').send({
//         username : "reddd",
//         password : "12345678",
//         email : "erika12@gmail.com"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(200);
//     });

//     it('It should reject new user /username taken', async()=>{
//       const res = await request.post('/api/user/').send({
//         username : "reddd",
//         password : "12345678",
//         email : "fiorerivas@gmail.com"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//     })

//     it('It should reject new user /email taken', async()=>{
//       const res = await request.post('/api/user/').send({
//         username : "Maigua",
//         password : "12345678",
//         email : "erika12@gmail.com"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//     })
//   });

//   describe('POST/ login user', ()=>{
//     it('It should login user succesfully',  async () => {
//       const res = await request.post('/api/user/login').send({
//         username : "Erika",
//         password : "12345678",
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(200);
//     });
  
//     it('It should reject login for user not in the DB /user DNE', async()=>{
//       const res = await request.post('/api/user/login').send({
//         username : "reddy",
//         password : "12345678",
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//       expect(res.body.message).to.equal("User does not exist!");
//     })

//     it('It should reject user that has not verified email /isVerified=False', async()=>{
//         const res = await request.post('/api/user/login').send({
//           username : "reddd",
//           password : "12345678",
//         }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//         expect(400);
//         expect(res.body.message).to.equal("User has not verified email!");
//       })
//   })

//   describe('PUT/ forgot-password', ()=>{
//     it('It should send password reset email successfully', async()=>{
//       const res = await request.put('/api/user/forgot-password').send({
//         email : "erika122@gmail.com",
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(200);
//       expect(res.body.message).to.equal("Email sent!");
//     })

//     it('It should reject password reset request due to email not found in the DB',  async () => {
//       const res = await request.put('/api/user/forgot-password').send({
//         email : "fiorelita@gmail.com",
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//       expect(res.body.message).to.equal("Email doesn't exist in our records");
//     });

//     it('It should reject password reset request due to invalid email format', async()=>{
//       const res = await request.put('/api/user/forgot-password').send({
//         email : "daniegmail.com",
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//       expect(res.body.message).to.equal("Invalid email address");
//     })
//   })

//   describe('PUT/ password-reset', ()=>{
//     it('It should successfully change password', async()=>{
//       const res = await request.put('/api/user/password-reset').query({token :
//         '5ee398b3a11ec4af380d96e781d8e552347e4d151bb9ba90f86f432385d1d0c440882ac2138446deb53aaa309653efa17de7d464c27548e76b034b90376732d7'})
//       .send({
//         password : "testing12",
//         confirmPassword : "testing12"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(200);
//       expect(res.body.message).to.equal("Email sent!");
//     })

//     it('It should reject passwords if they do not match',  async () => {
//       const res = await request.put('/api/user/password-reset').query({token :
//         '5ee398b3a11ec4af380d96e781d8e552347e4d151bb9ba90f86f432385d1d0c440882ac2138446deb53aaa309653efa17de7d464c27548e76b034b90376732d7'})
//       .send({
//         password : "testing12",
//         confirmPassword : "testing"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//       expect(res.body.message).to.equal("Invalid new password");
//     });

//     it('It should reject password reset request due to invalid or expired token in link sent', async()=>{
//       const res = await request.put('/api/user/password-reset').query({token :
//         '5ee398b3a11ec4af380d96e781d8e552347e4d151bb9ba90f86f432385d1d0c440882ac2138446deb53aaa309653efa17de7d464c27548e76b034b9037111111'})
//       .send({
//         password : "testing12",
//         confirmPassword : "testing12"
//       }).set('Content-Type', 'application/json').set('Accept', 'application/json').
//       expect(400);
//       expect(res.body.message).to.equal("Password reset token is invalid or has expired.");
//     })
//   })

//   describe('GET/ verify-email', ()=>{
//     it('It should verify the users email successfully', async()=>{
//       const res = await request.get('/api/user/verify-email').query({token :
//         '2da6c269f134e0873070e3480295dc3da8de0eb65ed2a832fedebda2229adfbdb71c03292bbf0ebffaaf75ae8d41b0b5907d283cb7ce90b61dab25ed200f5fe2'})
//       .expect(200);
//       expect(res.body.message).to.equal("User verified");
//     })

//     it('It should reject an invalid link',  async () => {
//       const res = await request.get('/api/user/verify-email').query({token :
//         '609a4783d7e0242b5885c4c5220e3682d04c121c4965c72493162ef54bc16ccbcf64eb5c01b2af4bbda0a67a5faae6f618ffcb934aa80955'})
//       .expect(400);
//       expect(res.body.message).to.equal("Invalid link!");
//     });

//   })

// })