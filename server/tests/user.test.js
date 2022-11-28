process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const supertest = require('supertest');
const {app, server} = require('../index');
const request = supertest(app);
const { connectDB, disconnectDB } = require('./db');
const expect = require("chai").expect;
const {User} = require('../schemas/User');
require('dotenv').config();

describe('User endpoint routes testing', () => {
 
  before(async()=>{
    connectDB();
    //User.deleteMany({}, (err) => console.log(err));
  })
  after(async()=>{
    //User.deleteMany({}, (err) => console.log(err));
    disconnectDB();
    server.close();
  })

  describe('POST/ create user', ()=>{
    it('It should create new user succesfully',  async () => {
      const res = await request.post('/api/user/').send({
        username : "redChild2",
        password : "12345678",
        email : "redChild2@gmail.com"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(200);
    });

    it('It should reject new user /username taken', async()=>{
      const res = await request.post('/api/user/').send({
        username : "reddd",
        password : "12345678",
        email : "fiorerivas@gmail.com"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
    })

    it('It should reject new user /email taken', async()=>{
      const res = await request.post('/api/user/').send({
        username : "Maigua",
        password : "12345678",
        email : "erika12@gmail.com"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
    })
  });

  describe('POST/ login user', ()=>{
    it('It should login user succesfully',  async () => {
      const res = await request.post('/api/user/login').send({
        username : "redChild2",
        password : "12345678",
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(200);
    });
  
    it('It should reject login for user not in the DB /user DNE', async()=>{
      const res = await request.post('/api/user/login').send({
        username : "test",
        password : "12345678",
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
      expect(res.body.message).to.equal("User does not exist!");
    })

    it('It should reject user that has not verified email /isVerified=False', async()=>{
        const res = await request.post('/api/user/login').send({
          username : "reddd",
          password : "12345678",
        }).set('Content-Type', 'application/json').set('Accept', 'application/json').
        expect(400);
        expect(res.body.message).to.equal("User has not verified email!");
      })
  })

  describe('PUT/ forgot-password', ()=>{
    it('It should send password reset email successfully', async()=>{
      const res = await request.put('/api/user/forgot-password').send({
        email : "reddy12@gmail.com",
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(200);
      expect(res.body.message).to.equal("Email sent!");
    })

    it('It should reject password reset request due to email not found in the DB',  async () => {
      const res = await request.put('/api/user/forgot-password').send({
        email : "fiorelita@gmail.com",
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
      expect(res.body.message).to.equal("Email doesn't exist in our records");
    });

    it('It should reject password reset request due to invalid email format', async()=>{
      const res = await request.put('/api/user/forgot-password').send({
        email : "daniegmail.com",
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
      expect(res.body.message).to.equal("Invalid email address");
    })
  })

  describe('PUT/ password-reset', ()=>{
    it('It should successfully change password', async()=>{
      const res = await request.put('/api/user/password-reset').query({token :
        '8e0d4d91cfac3047f358926b2815538c70315f8e54625c9c7a3ed5a935b12ce9d70d2f07ccf55b0ab8330ed5f09144822bbc7205edd7eb137854b0560b51c7a3'})
      .send({
        password : "tests1234",
        confirmPassword : "tests1234"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(200);
      expect(res.body.message).to.equal("Email sent!");
    })

    it('It should reject passwords if they do not match',  async () => {
      const res = await request.put('/api/user/password-reset').query({token :
        '5ee398b3a11ec4af380d96e781d8e552347e4d151bb9ba90f86f432385d1d0c440882ac2138446deb53aaa309653efa17de7d464c27548e76b034b90376732d7'})
      .send({
        password : "testing12",
        confirmPassword : "testing"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
      expect(res.body.message).to.equal("Invalid new password");
    });

    it('It should reject password reset request due to invalid or expired token in link sent', async()=>{
      const res = await request.put('/api/user/password-reset').query({token :
        '5ee398b3a11ec4af380d96e781d8e552347e4d151bb9ba90f86f432385d1d0c440882ac2138446deb53aaa309653efa17de7d464c27548e76b034b9037111111'})
      .send({
        password : "testing12",
        confirmPassword : "testing12"
      }).set('Content-Type', 'application/json').set('Accept', 'application/json').
      expect(400);
      expect(res.body.message).to.equal("Password reset token is invalid or has expired.");
    })
  })

  describe('GET/ verify-email', ()=>{
    it('It should verify the users email successfully', async()=>{
      const res = await request.get('/api/user/verify-email').query({token :
        '6520a54a669d0fe143fc564462883ddccbc50631d35147e01e912685a4f9300764ba291d6da2977dc61fe453d5d3ea00a12bee903045f7253f64a975e92f13a9'})
      .expect(200);
      expect(res.body.message).to.equal("User verified");
    })

    it('It should reject an invalid link',  async () => {
      const res = await request.get('/api/user/verify-email').query({token :
        '609a4783d7e0242b5885c4c5220e3682d04c121c4965c72493162ef54bc16ccbcf64eb5c01b2af4bbda0a67a5faae6f618ffcb934aa80955'})
      .expect(400);
      expect(res.body.message).to.equal("Invalid link!");
    });

  })

})