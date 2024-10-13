import fs from 'fs-extra';
import Freelancer from '../models/freelancerModels.js';

const filePath = './employees.json';

async function getFreelancers() {
    try {
        const data = await fs.readJson(filePath);
        return data.map(freelancer => new Freelancer(
            freelancer.nombre,
            freelancer.edad,
            freelancer.carrera,
            freelancer.años_de_experiencia,
            freelancer.habilidades,
            freelancer.tarifa_por_hora,
            freelancer.proyectos_anteriores,
            freelancer.disponibilidad,
            freelancer.ubicación,
            freelancer.calificaciones_o_reseñas,
            freelancer.certificaciones,
            freelancer.idiomas
        ));
    } catch (error) {
        console.error(error);
    }
}

async function saveFreelancers(freelancers) {
    try {
        await fs.writeJson(filePath, freelancers);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getFreelancers,
    saveFreelancers
};
