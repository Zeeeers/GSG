// Endpoints
const MemberEndpoints = {
    BASE: `/members`,
    DETAIL: (idMember: number): string => `members/${idMember}`,
};

// Export
export default MemberEndpoints;
