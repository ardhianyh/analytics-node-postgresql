import { Router } from "express";
import { GetAppDynamicsAlertController, GetAppDynamicsChartController, GetAppDynamicsController, InsertAppDynamicsController, PutAppDynamicsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetAppDynamicsController);
router.post('/', InsertAppDynamicsController);

router.get('/alerts', GetAppDynamicsAlertController);
router.get('/chart', GetAppDynamicsChartController);
router.put('/klarifikasi/:id', PutAppDynamicsKlarifikasiController);


export const appDynamicsRouter = router;