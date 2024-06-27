import { Request, Response, Router } from "express";
import { appDynamicsRouter } from "./appdynamics";
import { solarwindsRouter } from "./solarwinds";
import path from "path";
import { chartRouter } from "./chart";

const views = path.resolve('./src/views');

const router = Router();

router.get('/', (_: Request, response: Response) => {
   return response.sendFile(views + '/index.html');
});

router.get('/raw', (_: Request, response: Response) => {
   return response.sendFile(views + '/raw.html');
});

router.use('/appdynamics', appDynamicsRouter);
router.use('/solarwinds', solarwindsRouter);
router.use('/chart', chartRouter);

export const route = router;