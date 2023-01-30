import { expect } from "chai";
import supertest from "supertest";
const request = supertest('https://reqres.in/');
import { faker } from '@faker-js/faker';


describe('Check Users', () => {

    it('Get single user', async () => {
        const data = {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver',
            avatar: 'https://reqres.in/img/faces/2-image.jpg'
        };
        await request.get('api/users/2').then((res) => {
            expect(res.statusCode).eq(200);
            expect(res.body.data).to.not.be.empty; 
            expect(res.body.support).to.not.be.empty;
            expect(res.body.data).to.deep.include(data);
        });
    });

    it('Get list users', async () => {
        await request.get('api/users?page=2').then((res) => {
            expect(res.statusCode).eq(200);
            expect(res.body.data).to.not.be.empty;
            expect(res.body.page).eq(2); // Page number must be 2
            expect(res.body.per_page).eq(6); // There should be 6 records on each page
            // Last record id should be eq with total number
            expect(res.body.data[5].id).eq(res.body.total);
        });
               
    });
});

describe('Create New User', () => {
    let pattern = /\d+-+\d+-+\d+/;

    it('Create new user', async() => {
        // Creating a new user has a bug and new user doesn't add to the database
        var today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        const reqBody = {
            name: faker.name.firstName(),
            job: faker.name.jobTitle()
          };
        await request.post('api/users')
        .send(reqBody).then((res) => {
            expect(res.statusCode).eq(201);
            expect(res.body).to.not.be.empty;
            expect(res.body).to.deep.include(reqBody)
            let createdAt = pattern.exec(res.body.createdAt);
            expect(createdAt[0]).eq(today);
            globalThis.newUserID = res.body.id
        });
    });

});

describe('Negative Scenarios', () => {

    it('Get user with invalid id', async () => {
        await request.get(`api/users/${newUserID}`).then((res) => {
            expect(res.statusCode).eq(404);
            expect(res.body).to.be.empty; 
        });
    });

    it('trying to get a list of users with a page number out of range.', async () => {
        await request.get('api/users?page=5').then((res) => {
            expect(res.statusCode).eq(200);
            expect(res.body.data).to.be.empty; // response body must be empty
        });
    });

    it('Send a request to create user with incomplete data', async () => {
        const reqBody = {
            name: faker.name.firstName()
          };
        
        await request.post('api/users')
        .send(reqBody).then((res) => {
            expect(res.statusCode).eq(201)
        });
    }); 

});

    



    
