const QualitiesEndpoints = {
    BASE: '/interests/options',
    DETAIL: (interestId: number): string => `/interests/${interestId}`,
    SHOW: '/interests',
};

export default QualitiesEndpoints;
