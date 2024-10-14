import express from 'express';
import { check, validationResult } from 'express-validator';
import authService from '../services/authServices.js';

const router = express.Router();

router.post('/register', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const newUser = await authService.register(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verifica que los campos no estén vacíos
        if (!username || !password) {
            return res.status(400).json({ error: 'El nombre de usuario y la contraseña son requeridos' });
        }

        // Intenta iniciar sesión
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        console.error('Error en el login:', error); // Agregar registro de error para depuración
        res.status(400).json({ error: error.message });
    }
});

export default router;