import { User, IUserInstance } from './../models/User';
import * as UserService from '../services/UserService';

describe('Testes Métodos UserService', () => {
    let id = '1';
    let name = 'Vinicius';
    let age = 21;
    let email = 'vinicius@teste.com';

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('Método createUser - Criar novo usuário no banco de dados', async () => {
        const newUser = (await UserService.createUser(
            name,
            age,
            email
        )) as IUserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.name).toBe(name);
        expect(newUser.age).toBe(age);
        expect(newUser.email).toBe(email);
    });

    it('Método createUser - Deve retornar erro de e-mail já existente', async () => {
        const newUser = (await UserService.createUser(
            name,
            age,
            email
        )) as IUserInstance;
        expect(newUser).toBeInstanceOf(Error);
    });

    it('Método findByEmail - Busca usuário por email', async () => {
        const user = (await UserService.findByEmail(email)) as IUserInstance;
        expect(user.email).toBe(email);
        expect(user.name).toBe(name);
        expect(user.age).toBe(age);
    });

    it('Método findById - Buscar por ID', async () => {
        const user = (await UserService.findById(id)) as IUserInstance;
        expect(user.name).toBe(name);
    });

    it('Método findAll - Buscar todos usuários', async () => {
        const users = await UserService.findAll();
        expect(users.length).toBeGreaterThanOrEqual(1);
        for (let user in users) {
            expect(users[user]).toBeInstanceOf(User);
        }
    });

    it('Método updateUser - Alterar usuário ', async () => {
        const userChanged = await UserService.updateUser(id,name)
        expect(userChanged).not.toBeInstanceOf(Error);
    });

    it('Método updateUser - Deve retornar erro de usuário não encontrado ', async () => {
        const userChanged = await UserService.updateUser('2', name);
        expect(userChanged).toBeInstanceOf(Error);
    });
    
    it('Método deleteUser - Deletar Usuário', async () => {
        const user = (await UserService.deleteUser(id));
        expect(user).not.toBeInstanceOf(Error);
    });

    it('Método deleteUser - Deve retornar erro de usuário não encontrado', async () => {
        const user = (await UserService.deleteUser('2'));
        expect(user).toBeInstanceOf(Error);
    });
});