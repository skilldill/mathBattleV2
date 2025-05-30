import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { useShare } from "../../hooks/useShare";
import { FC } from "react";
import { ResultDto } from "../../types/MathTaskDto";


export const ButtonShareTasks: FC<{ result: ResultDto }> = ({ result }) => {
    const { t } = useTranslation();
    const { handleShare } = useShare(result);

    const handleShareClick = () => {
        handleShare();
    }
    
    return (
        <Button fluid size='small' onClick={handleShareClick}>
            {t('tasksShareBlockButtonText')}
        </Button>
    );
};
