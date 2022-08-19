import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

export const ping = (request: Request, response: Response) => {
    try {
        response.json({ servidor: true });
    } catch (error: any) {
        return response.status(400).json({
            error: error.message,
        });
    }
};

export const userRegister = async (request: Request, response: Response) => {
    try {
        if (request.body.name && request.body.age && request.body.email) {
            let { name, age, email } = request.body;
            const newUser = await UserService.createUser(name, age, email);

            let status = newUser instanceof Error ? 400 : 201;
            let res =
                newUser instanceof Error
                    ? { error: newUser.message }
                    : { response: 'User created successfully!' };

            return response.status(status).json(res);
        } else {
            return response.status(400).json({
                error: 'Empty fields in the request!',
            });
        }
    } catch (error: any) {
        return response.status(400).json({
            error: error.message,
        });
    }
};

export const listAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await UserService.findAll();
        return response.json({ response: users });
    } catch (error: any) {
        return response.status(400).json({
            error: error.message,
        });
    }
};

export const listUser = async (request: Request, response: Response) => {
    try {
        let { id } = request.params;
        const user = await UserService.findById(id);
        return response.json({ response: user });
    } catch (error: any) {
        return response.status(400).json({
            error: error.message,
        });
    }
};

export const updateUser = async (request: Request, response: Response) => {
    try {
        if (
            (request.params.id && request.body.name) ||
            request.body.age ||
            request.body.email
        ) {
            let id = request.params.id;
            let name = request.body?.name;
            let age = request.body?.age;
            let email = request.body?.email;

            const user = await UserService.updateUser(id, name, age, email);

            let status = user instanceof Error ? 400 : 200;
            let res =
                user instanceof Error
                    ? user.message
                    : 'Changed user successfully!';

            return response.status(status).json({ response: res });
        } else {
            return response.status(400).json({
                error: 'Empty fields in the request!',
            });
        }
    } catch (error: any) {
        response.status(400).json({
            error: error.message,
        });
    }
};

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const user = UserService.deleteUser(request.params.id);

        let status = user instanceof Error ? 400 : 200;
        let res =
            user instanceof Error ? user.message : 'User deleted successfully!';

        return response.status(status).json({
            response: res,
        });
    } catch (error: any) {
        return response.status(400).json({
            error: error.message,
        });
    }
};
