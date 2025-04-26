import React from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';
import { Button } from '../../components/Button/Button';
import { useTasksStore } from '../../store/tasksStore';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SettingsDailyRatingsScreen: React.FC = () => {
    const { setCreateParams } = useTasksStore();
    const history = useHistory();
    const { t } = useTranslation();

    const handleStart = () => {
        setCreateParams(20, 'combo');
        history.push('/puzzles-rating');
    }

    return (
        <ColumnLayout style={{ height: '100%' }}>
            <div>
                <h1>{t('settingRatingGameScreenTitle')}</h1>
            </div>
            <Button onClick={handleStart}>
                {t('ratingGameStartButtonText')}
            </Button>
        </ColumnLayout>
    );
}; 