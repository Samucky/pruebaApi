import freelancerRepository from '../repositories/freelancerRepositorie.js';

async function getAllFreelancers() {
    return await freelancerRepository.getFreelancers();
}

async function addFreelancer(freelancer) {
    if (!freelancer.nombre || !freelancer.carrera) {
        throw new Error("El freelancer debe tener un nombre y una carrera.");
    }

    const freelancers = await freelancerRepository.getFreelancers();

    const newId = freelancers.length > 0 ? Math.max(...freelancers.map(f => f.id)) + 1 : 1;
    const newFreelancer = { ...freelancer, id: newId };

    freelancers.push(newFreelancer);
    await freelancerRepository.saveFreelancers(freelancers);

    return newFreelancer;
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
  const freelancers = await freelancerRepository.getFreelancers();
  return freelancers.filter(freelancer => freelancer.carrera.toLowerCase() === carrera.toLowerCase());
}

export default {
  getAllFreelancers,
  addFreelancer,
  updateFreelancer,
  deleteFreelancer,
  findFreelancersByCareer
};
