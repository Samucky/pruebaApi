import express from "express";
import { check, validationResult } from 'express-validator';
import freelancerService from "../services/FreelancerServices.js";
import Freelancer from "../models/freelancerModels.js";

const router = express.Router();

router.get('/freelancers', async (req, res) => {
    try {
        const freelancers = await freelancerService.getAllFreelancers();
        res.json(freelancers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/freelancers",
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        check('carrera').not().isEmpty().withMessage('La carrera es requerida')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { nombre, edad, carrera, años_de_experiencia, habilidades, tarifa_por_hora, proyectos_anteriores, disponibilidad, ubicación, calificaciones_o_reseñas, certificaciones, idiomas } = req.body;
            const newFreelancer = new Freelancer(
                nombre, edad, carrera, años_de_experiencia, habilidades, tarifa_por_hora, proyectos_anteriores, disponibilidad, ubicación, calificaciones_o_reseñas, certificaciones, idiomas
            );
            const addedFreelancer = await freelancerService.addFreelancer(newFreelancer);

            res.status(201).json(addedFreelancer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.put("/freelancers/:id", async (req, res) => {
    try {
        const updatedFreelancer = await freelancerService.updateFreelancer(req.params.id, req.body);
        res.json(updatedFreelancer);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/freelancers/nombre/:nombre', async (req, res) => {
    try {
        const result = await freelancerService.deleteFreelancer(req.params.nombre);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/freelancers/carrera/:carrera', async (req, res) => {
    try {
      const freelancers = await freelancerService.findFreelancersByCareer(req.params.carrera);
      
      if (freelancers.length === 0) {
        return res.status(404).json({ message: 'No se encontraron freelancers con esa carrera' });
      }
  
      res.json(freelancers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;
