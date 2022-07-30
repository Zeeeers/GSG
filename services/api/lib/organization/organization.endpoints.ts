// Endpoints
const OrganizationEndpoints = {
    BASE: `/organization`,
    DETAIL: (organizationId: number): string => `/organization/${organizationId}`,
    PROJECT: (proyectId: number): string => `/organization/${proyectId}/contact`,
    REGISTER: `/auth/signup`,
};

// Export
export default OrganizationEndpoints;
