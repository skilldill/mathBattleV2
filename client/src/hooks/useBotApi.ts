import { ApiService } from "../api/ApiService";

export const useBotApi = () => {
    const sendMessage = async (userId: string, message: string) => {
        const response = await ApiService.botSendMessage(userId, message);
        return response;
    };

    return { sendMessage };
};
