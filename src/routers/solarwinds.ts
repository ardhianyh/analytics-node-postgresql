import { Router } from "express";
import { ExportSolarwindsController, GetSolarwindsController, InsertSolarwindsController, PutSolarwindsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.post('/', InsertSolarwindsController);

router.get('/export', ExportSolarwindsController);
router.put('/klarifikasi/:id', PutSolarwindsKlarifikasiController);

export const solarwindsRouter = router;