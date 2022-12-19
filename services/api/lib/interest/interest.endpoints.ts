// Endpoints
const QualitiesEndpoints = {
    BASE: '/interests/options',
    DETAIL: (interestId: number): string => `/interests/${interestId}`,
    SHOW: '/interests',
};

// Export
export default QualitiesEndpoints;
