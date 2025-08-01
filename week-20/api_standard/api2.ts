import { AUTH_ENDPOINTS } from '@src/apis/ApiConstant';
import { requestBuilder } from '@src/apis/api/requestBuilder';

export interface AuthResponse {
    status: 'success' | 'error';
    error?: string;
    redirect_path: string;
    access_token?: string; // Add this field
}

// Initiate Microsoft Login
export const initiateMicrosoftLogin = async (): Promise<void> => {
    console.log("Initiating Microsoft Login");
    try {
        const response = await requestBuilder.get<{ redirect_url: string }>(
            AUTH_ENDPOINTS.REDIRECT_TO_LOGIN
        );
        window.location.href = response.redirect_url;
    } catch (error) {
        console.error("Error initiating Microsoft login:", error);
    }
};

// Handle Callback and Store Token
export const handleCallback = async (code: string): Promise<AuthResponse> => {
    try {
        const response = await requestBuilder.get<AuthResponse>(AUTH_ENDPOINTS.CALLBACK, {
            params: { code },
        });

        if (response.access_token) {
            console.log("Token received, saving to storage");
            // Save to localStorage
            localStorage.setItem("access_token", response.access_token);

            // Save to cookies for server-side checks
            document.cookie = `access_token=${response.access_token}; Path=/; Secure; HttpOnly`;
        }

        return response;
    } catch (error) {
        console.error("Error during OAuth callback:", error);
        throw error;
    }
};


// Logout and Clear Token
export const logout = async (): Promise<void> => {
    try {
        localStorage.clear() 
        console.log("Logged out and cleared local storage");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
 