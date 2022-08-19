import { User } from '../models/User';

export const createUser = async (name: string, age: number, email: string) => {
    const hasUser = await User.findOne({ where: { email } });

    if (!hasUser) {
        const newUser = await User.create({ name, age, email });
        return newUser;
    } else {
        return new Error('Email already exists');
    }
};

export const findByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

export const findById = async (id: string) => {
    const user = await User.findOne({ where: { id } });
    return user ? user : 'ID does not exist in the database!';
};

export const findAll = async () => {
    return await User.findAll();
};

export const updateUser = async (
    id: string,
    name?: string,
    age?: number,
    email?: string
) => {
    if (await User.findOne({ where: { id } })) {
        if (name) {
            return await User.update(
                { name: name },
                {
                    where: {
                        id: id,
                    },
                }
            );
        }
        if (age) {
            return await User.update(
                { age: age },
                {
                    where: {
                        id: id,
                    },
                }
            );
        }
        if (email) {
            return await User.update(
                { email: email },
                {
                    where: {
                        id: id,
                    },
                }
            );
        }
    } else {
        return new Error('ID does not exist in the database!');
    }
};

export const deleteUser = async (id: string) => {
    if(await User.findOne({ where: { id } })) {
        return await User.destroy({
            where: {
                id: id,
            },
        });
    } else {
        return new Error ('ID does not exist in the database!');
    }
};
