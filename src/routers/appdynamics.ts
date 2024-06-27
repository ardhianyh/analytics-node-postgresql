import { Router } from "express";
import { GetAppDynamicsController, InsertAppDynamicsController, PutAppDynamicsKlarifikasiController } from "../controllers";
const router = Router();

router.get('/', GetAppDynamicsController);
router.post('/', InsertAppDynamicsController);

router.put('/klarifikasi/:id', PutAppDynamicsKlarifikasiController);


export const appDynamicsRouter = router;