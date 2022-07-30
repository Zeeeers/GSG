// Endpoints
const GsgEndpoints = {
    BASE: `/gsg`,
    DETAIL: (id: number) => `/gsg/${id}`,
    OWN: `/gsg/0`,
    JOB: '/admin/gsg/execute_job',
};

// Export
export default GsgEndpoints;
