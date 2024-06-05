export interface ISolarwindsAlert {
   id?: string;
   name: string;
}

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
   memory_used?: string;
   total_cpu_count?: string;
   total_memory?: string;
   os: string;
}