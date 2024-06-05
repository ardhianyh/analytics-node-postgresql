import { Router } from "express";
import { GetSolarwindsAlertController, GetSolarwindsController, InsertAppDynamicsController, InsertSolarwindsAlertController, InsertSolarwindsController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.post('/', InsertSolarwindsController);

router.get('/alerts', GetSolarwindsAlertController);
router.post('/alerts', InsertSolarwindsAlertController);


export const solarwindsRouter = router;