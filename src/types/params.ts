export interface IParams {
   page?: number;
   limit?: number;
}

export interface ISolarwindsParams extends IParams {
   severity?: string;
   layanan?: string;
   priority?: string;
}

export interface IAppDynamicsParams extends IParams {
   severity?: string;
   app?: string;
   priority?: string;
}

export interface IFilter {
   alert?: string;
   limit?: string;
   start_date?: string;
   end_date?: string;
   month?: string;
   year?: string;
}