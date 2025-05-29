import { ApiService } from "../api/ApiService";
import { useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";


export const useShare = () => {
    const [presentToast] = useIonToast();
    const { t } = useTranslation();

    const handleShare = async (resultId: string) => {
        try {
            const { id } = await ApiService.shareResult(resultId);
            const sharedLink = `${import.meta.env.VITE_BOT_LINK}?start=${id}`;

            await navigator.clipboard.writeText(sharedLink);
            presentToast({
                message: t('successCopiedToClipboard'),
                duration: 2000,
                color: 'success',
                position: 'top',
            });
        } catch (error) {
            console.error('Failed to share:', error);
        }
    }

    return { handleShare };
}
