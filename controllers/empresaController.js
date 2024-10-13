import express from "express";
import { check, validationResult } from 'express-validator';
import empresaService from "../services/empresaServices.js";
import Empresa from "../models/empresaModels.js";

const router = express.Router();

// Obtener todas las empresas
router.get('/empresas', async (req, res) => {
    try {
        const empresas = await empresaService.getAllEmpresas();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Agregar una nueva empresa
router.post("/empresas",
    [
        check('nombre_empresa').not().isEmpty().withMessage('El nombre de la empresa es requerido'),
        check('correo_electronico').isEmail().withMessage('El correo electrónico debe ser válido')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id,nombre_empresa, correo_electronico, telefono, representante } = req.body;
            const newEmpresa = new Empresa(id, nombre_empresa, correo_electronico, telefono, representante);
            const addedEmpresa = await empresaService.addEmpresa(newEmpresa);

            res.status(201).json(addedEmpresa);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar una empresa por ID
router.put("/empresas/:id", async (req, res) => {
    try {
        const updatedEmpresa = await empresaService.updateEmpresa(req.params.id, req.body);
        res.json(updatedEmpresa);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar una empresa por su nombre
router.delete('/empresas/id/:id', async (req, res) => {
    try {
        const result = await empresaService.deleteEmpresa(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


// Buscar empresas por representante
router.get('/empresas/representante/:representante', async (req, res) => {
    try {
        const empresas = await empresaService.findEmpresasByRepresentante(req.params.representante);
        
        if (empresas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron empresas con ese representante' });
        }

        res.json(empresas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
