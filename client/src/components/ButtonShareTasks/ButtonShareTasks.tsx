import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { FC } from "react";
import { ResultDto } from "../../types/MathTaskDto";
import { ApiService } from "../../api/ApiService";
import { useIonModal, useIonToast } from "@ionic/react";
import { msToSeconds } from "../../utils/timeUtils";
import { TextareaShare } from "./TextareaShare";
import { useBotApi } from "../../hooks/useBotApi";

export const ButtonShareTasks: FC<{ result: ResultDto }> = ({ result }) => {
    const { t } = useTranslation();
    const [presentToast] = useIonToast();
    const { sendMessage } = useBotApi();
    
    const fetchTasksCollectionId = async (): Promise<string | undefined> => {
        try {
            const { id } = await ApiService.shareResult(result.id);
            return id;
        } catch (error) {
            console.error('Failed to fetch tasks collection id:', error);
            return undefined;
        }
    }

    const getFallbackShareText = () => {
        const url = `${import.meta.env.VITE_BOT_LINK}?start=${result.id}`;
        const text = `${t('textForShare', {
            tasksCount: result.tasks.length,
            time: msToSeconds(result.time),
        })}\n${url}`;   

        return text;
    }

    const [presentModal] = useIonModal(TextareaShare, {
        text: getFallbackShareText(),
    });
    
    const handleShare = async () => {
        try {
            const tasksCollectionId = await fetchTasksCollectionId();

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

            await sendMessage(result.userId, getFallbackShareText());
            presentToast({
                message: t('attentionCheckSharingMessage'),
                duration: 2000,
                color: 'success',
                position: 'top',
            });
            // presentModal({ breakpoints: [0, 0.5], initialBreakpoint: 0.5 });
        }
    }
    
    return (
        <Button fluid size='small' onClick={handleShare}>
            {t('tasksShareBlockButtonText')}
        </Button>
    );
};
