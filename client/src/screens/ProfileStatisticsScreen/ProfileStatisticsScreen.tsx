import { ScreenLayout } from "../../components";
import { useTranslation } from 'react-i18next';

export const ProfileStatisticsScreen: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ScreenLayout>
            <h1>{t('statistics')}</h1>
        </ScreenLayout>
    );
};