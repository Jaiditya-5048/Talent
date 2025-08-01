export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:8000/callback";

export const AUTH_ENDPOINTS = {
    REDIRECT_TO_LOGIN: `${API_BASE_URL}/redirect-to-login`,
    CALLBACK: `${API_BASE_URL}/callback`,
    SESSION: `${API_BASE_URL}/auth/session`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    EMAILS: `${API_BASE_URL}/emails`,
    EMAIL_COUNT: `${API_BASE_URL}/email-count`,
    EMAIL_DETAIL: `${API_BASE_URL}/email`,
};

export const COOKIE_NAMES = {
    ACCESS_TOKEN: "access_token",
};

export const EMAIL_ENDPOINTS = {
    EMAIL_COUNT:`${API_BASE_URL}/email-count`,
    INTERNAL_SENDERS:`${API_BASE_URL}/internal-senders`,
    EXTERNAL_SENDERS:`${API_BASE_URL}/external-senders`,
    EMAIL_BY_SENDER : `${API_BASE_URL}/emails-by-sender`,
    EMAIL_DETAILS : `${API_BASE_URL}/email-details`
}