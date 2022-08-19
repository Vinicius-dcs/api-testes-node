import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/connPG';

export interface IUserInstance extends Model {
    id: number;
    name: string;
    age: number;
    email: string;
}

export const User = sequelize.define<IUserInstance>(
    'User',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        schema: 'pdi',
        tableName: 'users',
        timestamps: false,
    }
);
