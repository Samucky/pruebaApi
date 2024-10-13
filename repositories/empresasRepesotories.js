import fs from 'fs-extra';
import Empresa from '../models/empresaModels.js'; 

const filePath = './empresas.json'; // Asegúrate de que esta ruta sea la correcta

// Función para obtener todas las empresas
async function getEmpresas() {
    try {
        // Verificar si el archivo existe antes de leer
        if (!await fs.pathExists(filePath)) {
            await fs.writeJson(filePath, []); // Si no existe, crear un archivo vacío
        }

        const data = await fs.readJson(filePath);
        // Mapeamos los datos para crear instancias del modelo Empresa
        return data.map(empresa => new Empresa(
            empresa.id,
            empresa.nombre_empresa,
            empresa.correo_electronico,
            empresa.telefono,
            empresa.representante
        ));
    } catch (error) {
        console.error('Error leyendo datos de empresas:', error);
        throw new Error('No se pudo leer el archivo de empresas');
    }
}

// Función para guardar empresas
async function saveEmpresas(empresas) {
    try {
        // Escribir los datos en formato JSON
        await fs.writeJson(filePath, empresas, { spaces: 2 });
    } catch (error) {
        console.error('Error escribiendo datos de empresas:', error);
        throw new Error('No se pudo guardar el archivo de empresas');
    }
}

export default {
    getEmpresas,
    saveEmpresas
};
