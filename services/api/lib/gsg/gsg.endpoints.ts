// Endpoints
const GsgEndpoints = {
    BASE: `/gsg`,
    ADMIN: '/gsg/index_admin',
    DETAIL: (id: number): string => `/gsg/${id}`,
    OWN: `/gsg/0`,
    JOB: '/admin/gsg/execute_job',
    STATUS: (projectId: number): string => `/admin/users/publish_project/${projectId}`,
    CREATE: '/gsg/create',
};

// Export
export default GsgEndpoints;
