/*const tap = require('tap');
const request = require('request');
const fastify = require('../src/index.js');

const defaultUrl = 'http://localhost:8080/api/';

tap.test('GET /api/user/ route', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: defaultUrl + 'user/'
        },
        (err, response, body) => {
            t.error(err);
            t.equal(response.statusCode, 200);
            t.equal(body, 'Hello world')
            t.end()
        }
    );
});



tap.test('GET current user', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/user/getCurrentUser',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        },
        (err, response, body) => {
            t.error(err);
            const user = JSON.parse(body);
            t.equal(user.email, "max@gmail.com")
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});


tap.test('GET /profile route', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/user/profile',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        },
        (err, response, body) => {
            t.error(err);
            const user = JSON.parse(body);
            t.equal(user.email, "max@gmail.com");
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});

tap.test('GET /profile/:email', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/user/profile/max@gmail.com',
            headers: {
                'Authorization': `Bearer undefined`
            }
        },
        (err, response, body) => {
            t.error(err);
            const user = JSON.parse(body);
            t.equal(user.firstName, 'max')
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});

tap.test('GET /api/user/ route with malformed token', (t) => {
    t.plan(1);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/user/getCurrentUser',
            headers: {
                'Authorization': `Bearer undefined`
            }
        },
        (err, response, body) => {
            t.equal(response.statusCode, 401);
            t.end()
        }
    );
});

tap.test('Update profile', (t) => {
    t.plan(3);

    const data = {
        firstName: 'Yan',
        lastName: 'Palych',
        email: 'yan@mail.ru'
    }

    request(
        {
            method: 'PUT',
            url: 'http://localhost:8080/api/user/update/61d6f9640030637fc0647e97',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        },
        (err, response, body) => {
            t.error(err);
            const user = JSON.parse(body);
            t.equal(user.acknowledged, true);
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});

tap.test('GET /result/:id', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/result/61d56e46c1bee79654823c0c',
        },
        (err, response, body) => {
            t.error(err);
            const post = JSON.parse(body)
            t.equal(post.verdict, false);
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});


tap.test('PUT /result/:id', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/result/61d56e46c1bee79654823c0c',
            body: JSON.stringify({isSaved: false}),
            headers: {
                'Content-Type': 'application/json'
            }

        },
        (err, response, body) => {
            t.error(err);
            const post = JSON.parse(body)
            t.equal(post.verdict, false);
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});


tap.test('get /getResultsByUser/:id', (t) => {
    t.plan(3);

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/getResultsByUser/61d6f9640030637fc0647e97',

        },
        (err, response, body) => {
            t.error(err);
            const post = JSON.parse(body)
            t.equal(post.length === 0, true);
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});


/*tap.test('auth signup', (t) => {
    t.plan(3);

    const user = {
        firstName: "yan2",
        lastName: "test2",
        email: "test234@gmail.com",
        password: 'password'
    }

    request(
        {
            method: 'POST',
            url: 'http://localhost:8080/api/auth/signup',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }

        },
        (err, response, body) => {
            t.error(err);
            const post = JSON.parse(body)
            t.equal(typeof  post.result, 'string')
            t.equal(response.statusCode, 201);
        }
    );
});*/


/*tap.test('auth login', (t) => {
    t.plan(3);
    t.teardown(() => fastify.close());

    const user = {
        email: "test2@gmail.com",
        password: 'password'
    }

    request(
        {
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/getResultsByUser/61d6f9640030637fc0647e97',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }

        },
        (err, response, body) => {
            t.error(err);
            t.equal(response.statusCode, 200);
            t.end()
        }
    );
});*/


const fastify = require('../src/index.js');

jest.setTimeout(15000);

describe('tests', () => {


    test('GET /api/user/ route', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: '/api/user/',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('Hello world')

    });

    test('GET current user', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/user/getCurrentUser',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        });
        const user = JSON.parse(res.body);
        expect(res.statusCode).toBe(200);
        expect(user.email).toBe('max@gmail.com')

    });

    test('GET profile', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/user/profile',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        });
        const user = JSON.parse(res.body);
        expect(user.email).toBe("max@gmail.com");
        expect(res.statusCode).toBe(200);

    });

    test('GET /profile/:email', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/user/profile/max@gmail.com',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        });
        const user = JSON.parse(res.body);
        expect(res.statusCode).toBe(200);
        expect(user.firstName).toBe('max')

    });


    test('Update profile', async () => {

        const data = {
            firstName: 'Yan',
            lastName: 'Palych',
            email: 'yan@mail.ru'
        }

        const res = await fastify.inject({
            method: 'PUT',
            url: 'http://localhost:8080/api/user/update/61d6f9640030637fc0647e97',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const user = JSON.parse(res.body);
        expect(res.statusCode).toBe(200);
        expect(user.acknowledged).toBe(true)

    });

    test('GET /result/:id', async () => {

        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/result/61d56e46c1bee79654823c0c',
        });

        const post = JSON.parse(res.body)
        expect(res.statusCode).toBe(200);
        expect(post.verdict).toBe(false)
    });


    test('PUT /result/:id', async () => {

        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/result/61d56e46c1bee79654823c0c',
            body: JSON.stringify({isSaved: false}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const post = JSON.parse(res.body)
        expect(res.statusCode).toBe(200);
        expect(post.verdict).toBe(false)


    });


    test('delete /result/:id', async () => {

        const res = await fastify.inject({
            method: 'DELETE',
            url: 'http://localhost:8080/api/analyze/result/undefined',
        });

        expect(res.statusCode).toBe(500);


    });

    test('analyze', async () => {

        const body = {
            text: 'some fake info',
            sources: ['@hromadske_ua']
        }

        const res = await fastify.inject({
            method: 'POST',
            url: 'http://localhost:8080/api/analyze/analyse_text',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toBe(200);


    });



    test('send info', async () => {

        const body = {
            input_text :"В Україні все test",
            verdict:false,
            date:"",
            original_source_text:"",
            source_keywords:"",
            picture:"",
            cosine_similarity:"",
            source_channel: "",
            createdBy: "61d33b96868dc3c254fe72ae",
            isSaved :false
        }

        const res = await fastify.inject({
            method: 'post',
            url: 'http://localhost:8080/api/analyze/sendResultInfo',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toBe(200);


    });


    test('get /getResultsByUser/:id', async () => {
        const res = await fastify.inject({
            method: 'GET',
            url: 'http://localhost:8080/api/analyze/getResultsByUser/61d6f9640030637fc0647e97',
        });
        const post = JSON.parse(res.body)
        expect(res.statusCode).toBe(200);
        expect(post.length === 0).toBe(true)

    });


    test('signup', async () => {
        const user = {
            firstName: "yan2",
            lastName: "test2",
            email: "testing1345321@gmail.com",
            password: 'password'
        }
        const res = await fastify.inject({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/signup',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const post = JSON.parse(res.body)
        console.log(post)
        expect(typeof post.result).toBe('string')
        expect(res.statusCode).toBe(201);

    });

    test('logout', async () => {

        const res = await fastify.inject({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/logout',
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWQzM2I5Njg2OGRjM2MyNTRmZTcyYWUiLCJpYXQiOjE2NDE0ODM0NjF9.PhnP_2KYbjO2XgAqMJ7qDaM3TJiXo08XEQdlYdCawjc`
            }
        });
        expect(res.statusCode).toBe(200);

    });

    test('login', async () => {
        const user = {
            email: "max@gmail.com",
            password: 'password'
        }
        const res = await fastify.inject({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/login',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toBe(201);

    });


})


