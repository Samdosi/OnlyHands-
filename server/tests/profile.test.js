process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const supertest = require('supertest');
const {app, server} = require('../index');
const request = supertest(app);
const { connectDB, disconnectDB } = require('./db');

const expect = require("chai").expect;
const {Profile} = require('../schemas/Profile');
require('dotenv').config();

describe('Profile endpoint routes testing', () => {
    before(async()=>{
        connectDB();
        //Profile.deleteMany({}, (err) => console.log(err));
    })
      after(async()=>{
        //Profile.deleteMany({}, (err) => console.log(err));
        disconnectDB();
        server.close();
    })

    describe('POST /create profile', ()=>{
        it('Creates the profile for the user that is logged in successfully', async()=>{
            const res = await request.post('/api/profile/').send({
                firstName: "test",
                lastName : "test",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NTE4NzllZWFiYTM1ZGE2MzVjOTM0IiwiaWF0IjoxNjY5NjY2OTk4LCJleHAiOjE2Njk2NzA1OTh9.RZsEc7C1iv5XfBvy_OAf1qgN8HSpXT4Ca1PR-ZBHTDI')
            .expect(200);
            expect(res.body.message).to.equal("User Profile Created!");
        })

        it('Rejects request because user already has profile created', async()=>{
            const res = await request.post('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NTE4NzllZWFiYTM1ZGE2MzVjOTM0IiwiaWF0IjoxNjY5NjcxNTM1LCJleHAiOjE2Njk2NzUxMzV9.gNYUhXXWmrKPW13zH6A4jdSz11VR6n2Uvp2hiK-FzMg')
            .expect(406);
            expect(res.body.message).to.equal("User Profile Already Exists!");
        })

        it('Rejects request because no JWT token was specified', async()=>{
            const res = await request.post('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', '')
            .expect(403);
            expect(res.body.message).to.equal("No token specified!");
        })

        it('Rejects request because of invalid JWT token (User not logged in/user not found in the DB)', async()=>{
            const res = await request.post('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbag')
            .expect(401);
            expect(res.body.message).to.equal("Unauthorized!");
        })
    })

    describe('PUT /edit profile', ()=>{
        it('Edits a profile successfully', async()=>{
            const res = await request.put('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
                nickname: "testing"
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NTE4NzllZWFiYTM1ZGE2MzVjOTM0IiwiaWF0IjoxNjY5NjcxNTM1LCJleHAiOjE2Njk2NzUxMzV9.gNYUhXXWmrKPW13zH6A4jdSz11VR6n2Uvp2hiK-FzMg')
            .expect(200);
            expect(res.body.message).to.equal("User Profile Edited!");
        })

        it('Rejects an edit request because user does not have a profile (Profile == null)', async()=>{
            const res = await request.put('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
                nickname: "testing"
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NGRkYWRmNjE5NTFkNjYxOTU1NTg4IiwiaWF0IjoxNjY5NjY3OTI4LCJleHAiOjE2Njk2NzE1Mjh9.EOW-zWMYJ_CM1XqiyV66IjroXPMgHTZIkpIzhrQVwKE')
            .expect(404);
            expect(res.body.message).to.equal("Profile not found!");
        })

        it('Rejects an edit request because the user is not found in the DB', async()=>{
            const res = await request.put('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
                nickname: "testing"
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
            .expect(401);
        })
    })

    describe('GET /get profile', ()=>{
        it('Gets a profile successfully', async()=>{
            const res = await request.get('/api/profile/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NTE4NzllZWFiYTM1ZGE2MzVjOTM0IiwiaWF0IjoxNjY5NjcxNTM1LCJleHAiOjE2Njk2NzUxMzV9.gNYUhXXWmrKPW13zH6A4jdSz11VR6n2Uvp2hiK-FzMg')
            .expect(200);
        })

        it('Rejects a get request because user does not have a profile', async()=>{
            const res = await request.get('/api/profile/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NGRkYWRmNjE5NTFkNjYxOTU1NTg4IiwiaWF0IjoxNjY5NjcxMDQ5LCJleHAiOjE2Njk2NzQ2NDl9.fZKZLrD5XxO1aJx7hRYpa9He9oPc6f8g8yiyGT9mcs8')
            .expect(403);
        })

        it('Rejects a get request because no profile ID was provided', async()=>{
            const res = await request.get('/api/profile/').set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM4NGRkYWRmNjE5NTFkNjYxOTU1NTg4IiwiaWF0IjoxNjY5NjcxMDQ5LCJleHAiOjE2Njk2NzQ2NDl9.fZKZLrD5XxO1aJx7hRYpa9He9oPc6f8g8yiyGT9mcs8')
            .expect(403);
            expect(res.body.message).to.equal("Profile ID is required");
        })
    })
})
