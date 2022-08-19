import request from 'supertest';
import app from '../app';
import { User } from '../models/User';

// jest.setTimeout(10000);

describe('Testes de Rotas API', () => {
    let name = 'Vinicius';
    let age = '21';
    let email = 'vinicius@teste.com';

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('Verifica rota /ping', (done) => {
        request(app)
            .get('/ping')
            .then((response) => {
                expect(response.body.servidor).toBeTruthy();
                expect(response.statusCode).toBe(200);
                return done();
            });
    });

    it('Verifica rota /createUser com registro de usuário', (done) => {
        request(app)
            .post('/createUser')
            .send(`name=${name}&age=${age}&email=${email}`)
            .then((response) => {
                expect(response.body.error).toBeUndefined;
                expect(response.body.response).toBe(
                    'User created successfully!'
                );
                expect(response.statusCode).toBe(201);
                return done();
            });
    });

    it('Verifica rota /createUser se retorna erro de e-mail já cadastrado', (done) => {
        request(app)
            .post('/createUser')
            .send(`name=${name}&age=${age}&email=${email}`)
            .then((response) => {
                expect(response.body.error).not.toBeUndefined;
                expect(response.statusCode).toBe(400);
                return done();
            });
    });

    it('Verifica rota /listUser', (done) => {
        request(app)
            .get('/listUser')
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.response[0]).toHaveProperty('id');
                expect(response.body.response[0]).toHaveProperty('name');
                expect(response.body.response[0]).toHaveProperty('age');
                expect(response.body.response[0]).toHaveProperty('email');
                expect(response.body.response[0].name).toBe('Vinicius');
                return done();
            });
    });

    it('Verifica rota /listUser{id}', (done) => {
        request(app)
            .get('/listUser/1')
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.response).toHaveProperty('id');
                expect(response.body.response).toHaveProperty('name');
                expect(response.body.response).toHaveProperty('age');
                expect(response.body.response).toHaveProperty('email');
                expect(response.body.response.name).toBe('Vinicius');
                return done();
            });
    });

    it('Verifica rota /updateUser/{id}', (done) => {
        let newName = 'Alterado';

        request(app)
            .put('/updateUser/1')
            .send(`name=${newName}`)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.response).toBe(
                    'Changed user successfully!'
                );
            });
        request(app)
            .get('/listUser/1')
            .then((response) => {
                expect(response.body.response.name).toBe('Alterado');
                return done();
            });
    });

    it('Verifica rota /deleteUser/{id}', (done) => {
        request(app)
            .delete('/deleteUser/1')
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body.response).toBe(
                    'User deleted successfully!'
                );
            });
        request(app)
            .get('/listUser/1')
            .then((response) => {
                expect(response.body.response).toBe('ID does not exist in the database!');
                return done();
            });
    });
});
