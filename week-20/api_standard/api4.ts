import { requestBuilder } from '@src/apis/api/requestBuilder';
import { EmailCountResponse, InternalSender, ExternalSender, Email, EmailDetails } from "@src/interfaces"
import { EMAIL_ENDPOINTS } from "@src/apis/ApiConstant"


export const fetchEmailCounts = async (): Promise<EmailCountResponse> => {
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("Access token not found");
        }

        const response = await requestBuilder.get<EmailCountResponse>(EMAIL_ENDPOINTS.EMAIL_COUNT, {
            params: {
                access_token: accessToken,
            },
        });

        return response;
    } catch (error) {
        console.error("Failed to fetch email counts:", error);
        throw error;
    }
};


export const fetchInternalSenders = async (): Promise<InternalSender[]> => {          
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await requestBuilder.get<{ unique_internal_senders: InternalSender[] }>(
            EMAIL_ENDPOINTS.INTERNAL_SENDERS,
            {
                params: { access_token: accessToken },
            }
        );

        return response.unique_internal_senders;
    } catch (error) {
        console.error("Error fetching internal senders:", error);
        throw error;
    }
};


export const fetchExternalSenders = async (): Promise<ExternalSender[]> => {
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("No access token found");
        }

        const response = await requestBuilder.get<{ unique_external_senders: ExternalSender[] }>(
            EMAIL_ENDPOINTS.EXTERNAL_SENDERS,
            {
                params: { access_token: accessToken },
            }
        );
        return response.unique_external_senders;
    } catch (error) {
        console.error("Error fetching external senders:", error);
        throw error;
    }
};


export const fetchEmailsBySender = async (senderEmail: string): Promise<Email[]> => {
    try {
        const response = await requestBuilder.get<{ Emails: Email[] }>(EMAIL_ENDPOINTS.EMAIL_BY_SENDER, {
            params: {
                sender_email: senderEmail,
                access_token: localStorage.getItem("access_token"),
            },
        });
        return response.Emails;
    } catch (error) {
        console.error("Error fetching emails by sender:", error);
        throw error;
    }
};


export const fetchEmailDetails = async (messageId: string): Promise<EmailDetails> => {
    try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("Access token is missing. Please log in again.");
        }

        const response = await requestBuilder.get<EmailDetails>(EMAIL_ENDPOINTS.EMAIL_DETAILS, {
            params: {
                message_id: messageId,
                access_token: accessToken,
            },
        });

        return response;
    } catch (error) {
        console.error("Error fetching email details:", error);
        throw error;
    }
};