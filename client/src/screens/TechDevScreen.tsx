import { ScreenLayout } from '../components';
import { useTranslation } from 'react-i18next';


export const TechDevScreen: React.FC = () => {
    const { t } = useTranslation();

    return (
        <ScreenLayout>
            <h1>{t('techDevScreenTitle')}</h1>
            <code>
                
            </code>
        </ScreenLayout>
    );
};