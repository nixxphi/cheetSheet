
import express from 'express';
import PoliceRouter from './police.route.js';
import FireRouter from './fire.route.js';
import MedicalRouter from './medical.route.js';
import dbrouter from "./dB.route.js";

const mainRouter = express.Router();

// Mounting routers
mainRouter.use('/api/v1/police', PoliceRouter);
mainRouter.use('/api/v1/db', dbrouter);
mainRouter.use('/api/v1/fire', FireRouter);
mainRouter.use('/api/v1/medical', MedicalRouter);

export default mainRouter;
