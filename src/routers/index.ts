import { Request, Response, Router } from "express";
import { appDynamicsRouter } from "./appdynamics";
import { solarwindsRouter } from "./solarwinds";
import path from "path";

const views = path.resolve('./src/views');

const router = Router();

router.get('/', (_: Request, response: Response) => {
   return response.sendFile(views + '/index.html');
});

router.use('/appdynamics', appDynamicsRouter);
router.use('/solarwinds', solarwindsRouter);

export const route = router;