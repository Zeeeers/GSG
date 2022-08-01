// Endpoints
const QualitiesEndpoints = {
    BASE: '/quality',
    DETAIL: (qualityId: number): string => `/quality/${qualityId}`,
};

// Export
export default QualitiesEndpoints;
