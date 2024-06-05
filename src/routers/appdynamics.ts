import { Router } from "express";
import { GetAppDynamicsAlertController, GetAppDynamicsController, InsertAppDynamicsAlertController, InsertAppDynamicsController } from "../controllers";
const router = Router();

router.get('/', GetAppDynamicsController);
router.post('/', InsertAppDynamicsController);

router.get('/alerts', GetAppDynamicsAlertController);
router.post('/alerts', InsertAppDynamicsAlertController);


export const appDynamicsRouter = router;