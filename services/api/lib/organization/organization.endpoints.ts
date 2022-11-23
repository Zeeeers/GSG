// Endpoints
const OrganizationEndpoints = {
    BASE: `/organization`,
    DETAIL: (organizationId: number): string => `/organization/${organizationId}`,
    PROJECT: (proyectId: number): string => `/organization/${proyectId}/contact`,
    REGISTER: `/auth/signup`,
    CVS: '/user/pymes_csv',
};

// Export
export default OrganizationEndpoints;
