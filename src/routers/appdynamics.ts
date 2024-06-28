import { Router } from "express";
import { ExportAppdynamicsController, GetAppDynamicsController, InsertAppDynamicsController, PutAppDynamicsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetAppDynamicsController);
router.post('/', InsertAppDynamicsController);

router.get('/export', ExportAppdynamicsController);
router.put('/klarifikasi/:id', PutAppDynamicsKlarifikasiController);


export const appDynamicsRouter = router;