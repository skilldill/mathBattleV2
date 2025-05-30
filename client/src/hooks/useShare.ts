import { ApiService } from "../api/ApiService";
import { useIonToast } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ResultDto } from "../types/MathTaskDto";
import { useState } from "react";

export const useShare = (result: ResultDto) => {
    const [tasksCollectionId, setTasksCollectionId] = useState<string>();
    const [presentToast] = useIonToast();
    const { t } = useTranslation();

    const fetchTasksCollectionId = async () => {
        try {
            const { id } = await ApiService.shareResult(result.id);
            setTasksCollectionId(id);
        } catch (error) {
            console.error('Failed to fetch tasks collection id:', error);
        }
    }

    const nativeShare = async () => {
        const url = `${import.meta.env.VITE_BOT_LINK}?start=${result.id}`;
        const text = `${t('textForShare', {
            tasksCount: result.tasks.length,
            time: result.time,
        })}\n${url}`;
        const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;

        window.open(shareUrl, "_blank");
    }

    const handleShare = async () => {
        try {
            await fetchTasksCollectionId()

            const sharedLink = `${import.meta.env.VITE_BOT_LINK}?start=${tasksCollectionId}`;
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
            nativeShare();
        }
    }

    return { handleShare };
}
