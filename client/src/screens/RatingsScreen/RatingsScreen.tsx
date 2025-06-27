import React, { useEffect } from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';
import { useTranslation } from 'react-i18next';
import { useLeaderBoard } from '../../hooks/useLeaderBoard';
import { useUserStore } from '../../store/userStore';
import { IonSpinner, IonText } from '@ionic/react';
import { VerticalCenterLayout } from '../../components/VerticalCenterLayout/VerticalCenterLayout';
import styles from './RatingsScreen.module.css';
import { msToSeconds } from '../../utils/timeUtils';
import { Button } from '../../components/Button/Button';
import { useHistory } from 'react-router-dom';
// import { mockLeaderboard } from '../../mocks/leaderboardMock';

const getCardStyle = (index: number) => {
    switch (index) {
        case 0:
            return styles.gold;
        case 1:
            return styles.silver;
        case 2:
            return styles.bronze;
        default:
            return styles.regular;
    }
};

export const RatingsScreen: React.FC = () => {
    const { t } = useTranslation();
    const { leaderboard, loading, error, fetchLeaderboard, alreadyPlayedToday, checkAlreadyPlayedToday } = useLeaderBoard();
    const userId = useUserStore(state => state.userId);
    const history = useHistory();
    useEffect(() => {
        if (userId) {
            fetchLeaderboard(userId);
            checkAlreadyPlayedToday(userId);
        }
    }, []);

    // Use mock data for development
    // const displayData = mockLeaderboard;
    const displayData = leaderboard;
    const ratingGameDescription = t('ratingGameDescription', { returnObjects: true });

    if (loading) {
        return (
            <VerticalCenterLayout>
                <IonSpinner />
            </VerticalCenterLayout>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ColumnLayout style={{ gap: '20px' }}>
            <h1>{t('topMathematiciansRatingTitle')}</h1>
            {alreadyPlayedToday ? (
                <Block>
                    <IonText>
                        <p style={{ marginBottom: '14px' }}>{t('alreadyPlayedToday')}</p>
                        <p>{t('comeBackTomorrow')}</p>
                    </IonText>
                </Block>
            ) : (
                <ColumnLayout style={{ gap: '20px' }}>
                    <Block>
                        <IonText>
                            {(ratingGameDescription as string[]).map((text: string) => (
                                <p key={text} style={{ marginBottom: '14px' }}>{text}</p>
                            ))}
                        </IonText>
                    </Block>
                    <Button fluid color='success' onClick={() => history.push('/puzzles-rating')}>
                        {t('play')} 🥇
                    </Button>
                </ColumnLayout>
            )}

            {/* User's Rating Data */}
            {displayData?.userData && (
                <Block>
                    <ColumnLayout style={{ gap: '20px' }}>
                        <h2 className={styles.title}>{t('yourRating')}</h2>
                        <div className={styles.userStats}>
                            <div className={styles.statBlock}>
                                <span className={styles.statLabel}>{t('place')}</span>
                                <span className={styles.statValue}>{displayData?.userPlace}</span>
                            </div>
                            <div className={styles.statBlock}>
                                <span className={styles.statLabel}>{t('accuracy')}</span>
                                <span className={styles.statValue}>{(displayData?.userData?.accuracy * 100).toFixed(1)}%</span>
                            </div>
                            <div className={styles.statBlock}>
                                <span className={styles.statLabel}>{t('tasksCompleted')}</span>
                                <span className={styles.statValue}>{displayData?.userData?.tasksResolvedCount}/{displayData?.userData?.tasksCount}</span>
                            </div>
                            <div className={styles.statBlock}>
                                <span className={styles.statLabel}>{t('totalTime')}</span>
                                <span className={styles.statValue}>{msToSeconds(displayData?.userData?.totalTime || 0)} {t('timeSecondsUnit')}</span>
                            </div>
                        </div>
                    </ColumnLayout>
                </Block>
            )}

            {/* Top 10 Players Table */}
            <ColumnLayout style={{ gap: '20px' }}>
                {displayData?.top10.map((player, index) => (
                    <div key={player.userId} className={`${styles.leaderCard} ${getCardStyle(index)}`}>
                        <ColumnLayout style={{ gap: '8px' }}>
                            <div className={styles.place}>
                                <span className={styles.placeNumber}>{index + 1}</span>
                                <p className={styles.leaderName}>{player.username || player.firstName || t('defaultUsername')}</p>
                            </div>
                            <div className={styles.leaderInfo}>
                                <div className={styles.leaderStats}>
                                    <p>{t('accuracy')}: {(player.accuracy * 100).toFixed(1)}%</p>
                                    <p>{t('tasksCompleted')}: {player.tasksResolvedCount}/{player.tasksCount}</p>
                                    <p>{t('totalTime')}: {msToSeconds(player.totalTime)} {t('timeSecondsUnit')}</p>
                                </div>
                            </div>
                        </ColumnLayout>
                    </div>
                ))}
            </ColumnLayout>
        </ColumnLayout>
    );
};