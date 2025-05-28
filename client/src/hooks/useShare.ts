import { useState } from "react";
import { ApiService } from "../api/ApiService";

export const useShare = () => {
    const [success, setSuccess] = useState(false);

    const handleShare = async (resultId: string) => {
        try {
            const { id } = await ApiService.shareResult(resultId);
            const sharedLink = `${import.meta.env.VITE_BOT_LINK}?start=${id}`;

            await navigator.clipboard.writeText(sharedLink);
            setSuccess(true)
        } catch (error) {
            console.error('Failed to share:', error);
        }
    }

    return { handleShare, success, setSuccess };
}
