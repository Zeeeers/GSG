// Endpoints
const UserEndpoints = {
    BASE: `/user`,
    INVESTOR: '/admin/users/create_investor',
    FORCE: '/admin/force_match',
    SEND_INTEREST: (id: number) => `/user/${id}/send_interest`,
    INDEX: '/admin/users/investors',
    DELETE: (id: number) => `/admin/users/destroy_investor/${id}`,
    UPDATE_STATUS: (id: number) => `/admin/users/toggle_investor/${id}`,
};

// Export
export default UserEndpoints;
