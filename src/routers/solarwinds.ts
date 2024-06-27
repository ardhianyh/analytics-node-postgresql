import { Router } from "express";
import { GetSolarwindsController, InsertSolarwindsController, PutSolarwindsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.post('/', InsertSolarwindsController);
router.put('/klarifikasi/:id', PutSolarwindsKlarifikasiController);

export const solarwindsRouter = router;