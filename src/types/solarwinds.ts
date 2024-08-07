export interface ISolarwinds {
   id?: string;
   alert: string;
   severity: string;
   layanan: string;
   priority: string;
   service_time: string;
   ip_address: string;
   node_name: string;
   percent_disk_used?: string;
   disk_used?: string;
   cpu_load?: string;
   memory_used?: string;
   total_cpu_count?: string;
   total_memory?: string;
   os: string;
   klarifikasi?: string;
   created_at?: string;
}

export interface ISolarwindsUpload extends ISolarwinds {
   no_layanan?: string;
   hostname?: string;
   max_cpu_used?: string;
   max_memory_used?: string;
}