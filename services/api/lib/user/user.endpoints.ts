// Endpoints
const UserEndpoints = {
    BASE: `/user`,
    INVESTOR: '/admin/users/create_investor',
    FORCE: '/admin/force_match',
    SEND_INTEREST: (id: number) => `/user/${id}/send_interest`,
};

// Export
export default UserEndpoints;
