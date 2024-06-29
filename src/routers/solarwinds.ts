import { Router } from "express";
import { ExportSolarwindsController, GetSolarwindsController, InsertSolarwindsController, PutSolarwindsKlarifikasiController, UploadSolarwindsController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.post('/', InsertSolarwindsController);

router.get('/export', ExportSolarwindsController);
router.post('/upload', UploadSolarwindsController);
router.put('/klarifikasi/:id', PutSolarwindsKlarifikasiController);

export const solarwindsRouter = router;