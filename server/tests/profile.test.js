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
        // it('Creates the profile for the user that is logged in successfully', async()=>{
        //     const res = await request.post('/api/profile/').send({
        //         firstName: "hehe",
        //         lastName : "here",
        //         height : "5'7",
        //         weight : 23,
        //         gender : "female",
        //         age : 33,
        //     }).set('Content-Type', 'application/json').set('Accept', 'application/json')
        //     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
        //     .expect(200);
        //     expect(res.body.message).to.equal("User Profile Created!");
        // })

        // it('Rejects request because user is not found in the DB', async()=>{
        //     const res = await request.post('/api/profile/').send({
        //         firstName: "hehe",
        //         lastName : "here",
        //         height : "5'7",
        //         weight : 23,
        //         gender : "female",
        //         age : 33,
        //     }).set('Content-Type', 'application/json').set('Accept', 'application/json')
        //     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
        //     .expect(400);
        //     expect(res.body.message).to.equal("User DNE!");
        // })

        // it('Rejects request because user already has profile created', async()=>{
        //     const res = await request.post('/api/profile/').send({
        //         firstName: "hehe",
        //         lastName : "here",
        //         height : "5'7",
        //         weight : 23,
        //         gender : "female",
        //         age : 33,
        //     }).set('Content-Type', 'application/json').set('Accept', 'application/json')
        //     .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
        //     .expect(400);
        //     expect(res.body.message).to.equal("User Profile Already Exists!");
        // })

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

        it('Rejects request because of invalid JWT token (User not logged in)', async()=>{
            const res = await request.post('/api/profile/').send({
                firstName: "hehe",
                lastName : "here",
                height : "5'7",
                weight : 23,
                gender : "female",
                age : 33,
            }).set('Content-Type', 'application/json').set('Accept', 'application/json')
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
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
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
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
            .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM2MmUxMjA1MmZmYWE0NmMwOGQxZmZmIiwiaWF0IjoxNjY3NDI4Mjg2LCJleHAiOjE2Njc0MzE4ODZ9.2sGeU5rVLgm2Ny6m_wKgyfna50vBIvUSV8GBbagzFQY')
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
            .expect(404);
            expect(res.body.message).to.equal("User not found!");
        })
    })
})
