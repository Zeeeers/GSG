// Endpoints
const GsgEndpoints = {
    BASE: `/gsg`,
    DETAIL: (id: number) => `/gsg/${id}`,
    OWN: `/gsg/0`,
    JOB: '/admin/gsg/execute_job',
    STATUS: (projectId: number): string => `/admin/users/${projectId}`,
};

// Export
export default GsgEndpoints;
