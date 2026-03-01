import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize ('postgres', 'postgres', 'admin@027', {
    host: 'localhost',
    dialect: 'postgres'
});

export const connectDB = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

