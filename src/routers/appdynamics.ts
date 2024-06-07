import { Router } from "express";
import { GetAppDynamicsAlertController, GetAppDynamicsController, GetAppDynamicsSeverityController, InsertAppDynamicsController, PutAppDynamicsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetAppDynamicsController);
router.post('/', InsertAppDynamicsController);

router.get('/alerts', GetAppDynamicsAlertController);
router.get('/severity', GetAppDynamicsSeverityController);
router.put('/klarifikasi/:id', PutAppDynamicsKlarifikasiController);


export const appDynamicsRouter = router;