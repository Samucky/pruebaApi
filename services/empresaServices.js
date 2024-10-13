import empresaRepository from '../repositories/empresasRepesotories.js'; // Import the empresaRepository

// Get all companies
async function getAllEmpresas() {
    return await empresaRepository.getEmpresas();
}

// Add a new company
async function addEmpresa(empresa) {
    if (!empresa.nombre_empresa || !empresa.correo_electronico) {
        throw new Error("La empresa debe tener un nombre y un correo electrónico.");
    }

    const empresas = await empresaRepository.getEmpresas();

    // Generate a new ID
    const newId = empresas.length > 0 ? Math.max(...empresas.map(e => e.Id)) + 1 : 1;
    const newEmpresa = { ...empresa, id: newId };

    // Add the new company to the list
    empresas.push(newEmpresa);
    await empresaRepository.saveEmpresas(empresas);

    return newEmpresa;
}

// Update an existing company
async function updateEmpresa(id, updatedEmpresa) {
    const empresas = await empresaRepository.getEmpresas();
    const index = empresas.findIndex(empresa => empresa.id === parseInt(id));

    if (index === -1) {
        throw new Error('Empresa no encontrada');
    }

    // Prevent changing the ID
    delete updatedEmpresa.Id;
    empresas[index] = { ...empresas[index], ...updatedEmpresa };

    await empresaRepository.saveEmpresas(empresas);
    return empresas[index];
}

async function deleteEmpresa(id) {
    const empresas = await empresaRepository.getEmpresas();
    console.log("Empresas disponibles:", empresas); // Agrega un log para ver las empresas

    const index = empresas.findIndex(empresa => empresa.id === parseInt(id)); // Asegúrate de comparar correctamente

    if (index === -1) {
        throw new Error('Empresa no encontrada'); // Esto se lanzará si el índice es -1
    }

    const filteredEmpresas = empresas.filter(empresa => empresa.id !== parseInt(id));
    await empresaRepository.saveEmpresas(filteredEmpresas);
    return { message: 'Empresa eliminada' };
}



// Find companies by representative
async function findEmpresasByRepresentante(representante) {
    const empresas = await empresaRepository.getEmpresas();
    return empresas.filter(empresa => empresa.representante.toLowerCase() === representante.toLowerCase());
}

export default {
    getAllEmpresas,
    addEmpresa,
    updateEmpresa,
    deleteEmpresa,
    findEmpresasByRepresentante
};
