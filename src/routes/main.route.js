import express from 'express';
import PoliceRouter from './police.route.js';
import FireRouter from './fire.route.js';
import MedicalRouter from './medical.route.js';
import dbrouter from "./dB.route.js";

const mainRouter = express.Router();

// Mountinr routers
mainRouter.use('/services/police', PoliceRouter);
mainRouter.use('/services/db', dbrouter);
mainRouter.use('/services/fire', FireRouter);
mainRouter.use('/services/medical', MedicalRouter);

export default mainRouter;
