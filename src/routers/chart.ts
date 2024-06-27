import { Router } from "express";
import { GetChartController } from "../controllers";
const router = Router();

router.get('/', GetChartController);

export const chartRouter = router;