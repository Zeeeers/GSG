// Endpoints
const endpoints = {
    LOGIN: `/auth/login`,
    ADMIN_LOGIN: '/admin/login',
    REGISTER: `/auth/signup`,
    CHECK_EMAIL: `/user/check_email`,
    RECOVER_PASSWORD: `/recovery/generateToken`,
    NEW_PASSWORD: `/recovery/changePassword`,
    ACTIVATE_ACCOUNT: `/activate`,
};

// Export
export default endpoints;
