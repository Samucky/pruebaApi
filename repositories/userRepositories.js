import fs from 'fs-extra';
import User from '../models/userModels.js';

const filePath = './user.json';

async function saveUsers(users) {
    try {
        await fs.writeJson(filePath, users);
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    try {
        const data = await fs.readJson(filePath);
        // Asegúrate de que 'data' sea un arreglo
        if (!Array.isArray(data)) {
            throw new Error('El formato de los datos es incorrecto; se esperaba un arreglo.');
        }
        return data.map(user => new User(user.id, user.username, user.password));
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return []; // Retorna un arreglo vacío en caso de error
    }
}


export default {
    saveUsers,
    getUsers
};