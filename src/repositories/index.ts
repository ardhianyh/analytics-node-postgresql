import { connectPostgres } from "../config/database";
import { getRequiredEnvironmentVariables } from "../utils/get-required-environment-variables";
import { AppDynamicsRepository } from "./appdynamics-repository";
import { ChartRepository } from "./chart-repository";
import { SolarwindsRepository } from "./solarwinds-repository";

export let appDynamicRepository: AppDynamicsRepository;
export let solarwindsRepository: SolarwindsRepository;
export let chartRepository: ChartRepository;

export const initializeRepositories = async (): Promise<void> => {
   const requiredVariables = getRequiredEnvironmentVariables();
   const pgDatabase = await connectPostgres({
      host: requiredVariables.databaseHost,
      port: +(requiredVariables.databasePort),
      user: requiredVariables.databaseUser,
      password: requiredVariables.databasePassword,
      database: requiredVariables.databaseName
   });

   if (pgDatabase instanceof Error) {
      throw new Error(pgDatabase.message);
   }

   appDynamicRepository = new AppDynamicsRepository(pgDatabase);
   solarwindsRepository = new SolarwindsRepository(pgDatabase);
   chartRepository = new ChartRepository(pgDatabase);
}