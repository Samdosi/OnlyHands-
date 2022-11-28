import React, { PureComponent } from 'react';
import axios from 'axios';
const urlBase = 'https://only-hands.herokuapp.com'//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3YzAwOGYwZjg5YjNlZjNkMzhmNmQwIiwiaWF0IjoxNjY5MDgxMjMzLCJleHAiOjE2NjkwODQ4MzN9.C-yOB2l60SxXocx3g4LeT4Z_5LyfpSz5WbwwygWYqnc

async function testing(){
    const header = {
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjM3YzAwOGYwZjg5YjNlZjNkMzhmNmQwIiwiaWF0IjoxNjY5MDgxMjMzLCJleHAiOjE2NjkwODQ4MzN9.C-yOB2l60SxXocx3g4LeT4Z_5LyfpSz5WbwwygWYqnc'
    }


    const res = await axios.get(urlBase + '/api/profile',{
        headers:header
    });
    
    console.log(res);
    

}