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

router.get('/upload', (_: Request, response: Response) => {
   return response.sendFile(views + '/upload.html');
});

router.get('/report', (_: Request, response: Response) => {
   return response.sendFile(views + '/report.html');
});

router.use('/api/webhooks/appdynamics', appDynamicsRouter);
router.use('/api/webhooks/solarwinds', solarwindsRouter);
router.use('/chart', chartRouter);

export const route = router;