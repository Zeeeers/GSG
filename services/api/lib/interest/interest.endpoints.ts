// Endpoints
const QualitiesEndpoints = {
    BASE: '/interests/options',
    DETAIL: (interestId: number): string => `/interests/${interestId}`,
};

// Export
export default QualitiesEndpoints;
