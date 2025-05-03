import React, { useEffect } from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';
import { useTranslation } from 'react-i18next';
import { useLeaderBoard } from '../../hooks/useLeaderBoard';
import { useUserStore } from '../../store/userStore';

export const RatingsScreen: React.FC = () => {
    const { t } = useTranslation();
    const { leaderboard, loading, error, fetchLeaderboard } = useLeaderBoard();
    const userId = useUserStore(state => state.userId);

    useEffect(() => {
        if (userId) {
            fetchLeaderboard(userId);
        }
    }, []); 

    return (
        <Block>
            <ColumnLayout style={{ gap: '10px' }}>
                <h1>{t('topMathematiciansRatingTitle')}</h1>
                <p>{t('topMathematiciansRatingContent')}</p>
            </ColumnLayout>
        </Block>
    );
};