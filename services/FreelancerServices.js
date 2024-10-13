import freelancerRepository from '../repositories/freelancerRepositorie.js';

async function getAllFreelancers() {
    return await freelancerRepository.getFreelancers();
}


async function addFreelancer(freelancer) {
    // Verifica que el freelancer tenga nombre y carrera
    if (!freelancer.nombre || !freelancer.carrera) {
        throw new Error("El freelancer debe tener un nombre y una carrera.");
    }

    // Obtiene la lista actual de freelancers
    const freelancers = await freelancerRepository.getFreelancers();
    console.log('Freelancers existentes:', freelancers); // Imprime la lista actual

    // Genera un nuevo ID, asegurando que no se generen NaN
    const newId = freelancers.length > 0 ? Math.max(...freelancers.map(f => f.id || 0)) + 1 : 1;
    
    // Crea un nuevo freelancer incluyendo el nuevo ID
    const newFreelancer = { ...freelancer, id: newId };
    console.log('Nuevo freelancer a agregar:', newFreelancer); // Depuración

    // Añade el nuevo freelancer a la lista existente
    freelancers.push(newFreelancer);
    
    // Guarda la lista actualizada de freelancers
    await freelancerRepository.saveFreelancers(freelancers);

    // Retorna el nuevo freelancer con el ID
    return newFreelancer; // Aquí ya se incluye el id
}


async function updateFreelancer(id, updatedFreelancer) {
    const freelancers = await freelancerRepository.getFreelancers();
    const index = freelancers.findIndex(freelancer => freelancer.id === parseInt(id));

    if (index === -1) {
        throw new Error('Freelancer no encontrado');
    }

    delete updatedFreelancer.id;
    freelancers[index] = { ...freelancers[index], ...updatedFreelancer };

    await freelancerRepository.saveFreelancers(freelancers);
    return freelancers[index];
}

async function deleteFreelancer(nombre) {
    const freelancers = await freelancerRepository.getFreelancers();
    const index = freelancers.findIndex(freelancer => freelancer.nombre.toLowerCase() === nombre.toLowerCase());

    if (index === -1) {
        throw new Error('Freelancer no encontrado');
    }

    const filteredFreelancers = freelancers.filter(freelancer => freelancer.nombre.toLowerCase() !== nombre.toLowerCase());
    await freelancerRepository.saveFreelancers(filteredFreelancers);
    return { message: 'Freelancer eliminado' };
}

async function findFreelancersByCareer(carrera) {
    if (typeof carrera !== 'string') {
        throw new Error("La carrera debe ser una cadena.");
    }

    const freelancers = await freelancerRepository.getFreelancers();
    
    // Filtrar sólo los freelancers que tengan 'carrera' válida y de tipo string
    return freelancers.filter(freelancer => 
        typeof freelancer.carrera === 'string' && 
        freelancer.carrera.toLowerCase() === carrera.toLowerCase()
    );
}


export default {
  getAllFreelancers,
  addFreelancer,
  updateFreelancer,
  deleteFreelancer,
  findFreelancersByCareer
};
