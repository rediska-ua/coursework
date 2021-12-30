const { setupServer } = require('../src/index');

const signUpUser = async () => {
    const server = setupServer();

    const user = { password: 'test', email: 'test2@gmail.com' };

    const reply = server.inject({
        url: '/api/login',
        method: 'POST',
        payload: user
    });
    reply.then(data => console.log(data))
}

signUpUser().then(r => console.log(r))
