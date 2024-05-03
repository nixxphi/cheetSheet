import express from 'express';
import PoliceRouter from './police.route.js';
import FireRouter from './fire.route.js';
import MedicalRouter from './medical.route.js';
import dbrouter from "./dB.route.js";

const mainRouter = express.Router();

// Mountinr routers
mainRouter.use('/police', PoliceRouter);
mainRouter.use('/db', dbrouter);
mainRouter.use('/fire', FireRouter);
mainRouter.use('/medical', MedicalRouter);

export default mainRouter;
