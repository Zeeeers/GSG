// Endpoints
const OrganizationEndpoints = {
    BASE: `/organization`,
    DETAIL: (organizationId: number): string => `/organization/${organizationId}`,
    REGISTER: `/auth/signup`,
};

// Export
export default OrganizationEndpoints;
