import { useTranslation } from "react-i18next";
import { Button } from "../Button/Button";
import { useShare } from "../../hooks/useShare";
import { FC } from "react";


export const ButtonShareTasks: FC<{ resultId: string }> = ({ resultId }) => {
    const { t } = useTranslation();
    const { handleShare } = useShare();

    const handleShareClick = () => {
        handleShare(resultId);
    }
    
    return (
        <Button fluid size='small' onClick={handleShareClick}>
            {t('share')}
        </Button>
    );
};
