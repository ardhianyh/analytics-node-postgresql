import { Router } from "express";
import { ExportSolarwindsController, ExportSolarwindsUploadController, GetReportSolarwindsController, GetSolarwindsController, InsertSolarwindsController, PutSolarwindsKlarifikasiController, UploadSolarwindsController } from "../controllers";
const router = Router();

router.get('/', GetSolarwindsController);
router.post('/', InsertSolarwindsController);

router.get('/export', ExportSolarwindsController);
router.get('/report', GetReportSolarwindsController);
router.get('/report/export', ExportSolarwindsUploadController);
router.post('/upload', UploadSolarwindsController);
router.put('/klarifikasi/:id', PutSolarwindsKlarifikasiController);

export const solarwindsRouter = router;