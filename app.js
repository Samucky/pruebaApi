import express from 'express';
import morgan from 'morgan'; 
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import freelancersController from './controllers/FreelancersController.js';
import empresasController from './controllers/empresaController.js'; 

const app = express();

const corsOptions = {
   origin: '*', 
   optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/freelancers', freelancersController);

app.use('/api/empresas', empresasController);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Ya no le muevas porque anda corriendo en el puerto: ${PORT}: http://localhost:${PORT}`);
});
