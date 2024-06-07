import { Router } from "express";
import { GetSolarwindsController, GetSolarwindsSeverityController, InsertSolarwindsController, PutSolarwindsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.get('/severity', GetSolarwindsSeverityController);
router.post('/', InsertSolarwindsController);
router.put('/klarifikasi/:id', PutSolarwindsKlarifikasiController);

export const solarwindsRouter = router;