import { ApiService } from "../api/ApiService";
import { useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ResultDto } from "../types/MathTaskDto";

export const useShare = (result: ResultDto) => {
    const [presentToast] = useIonToast();
    const { t } = useTranslation();

    const handleShare = async () => {
        try {
            const { id } = await ApiService.shareResult(result.id);
            const sharedLink = `${import.meta.env.VITE_BOT_LINK}?start=${id}`;
            const sharedText = t('textForShare', {
                tasksCount: result.tasks.length,
                time: result.time,
            });

            const massageForShare = `${sharedText}\n${sharedLink}`;

            await navigator.clipboard.writeText(massageForShare);
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
