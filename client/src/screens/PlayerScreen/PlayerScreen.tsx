import { useEffect } from "react";
import { ScreenLayout } from "../../components/ScreenLayout/ScreenLayout";
import { useResults } from "../../hooks/useResults";
import styles from './PlayerScreen.module.css';
import { useUserStore } from "../../store/userStore";
import { VerticalCenterLayout } from "../../components/VerticalCenterLayout/VerticalCenterLayout";
import { IonSpinner } from "@ionic/react";
import { ExercisesResultCard } from "../../components/ExercisesResultCard/ExercisesResultCard";
import { ColumnLayout } from "../../components/ColumnLayout/ColumnLayout";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button/Button";
import { StickyBlock } from "../../components/StickyBlock/StickyBlock";

export const PlayerScreen: React.FC = () => {
    const { resultsList, loading, fetchResultsByUserId } = useResults();
    const userId = useUserStore((state) => state.userId);
    const { t } = useTranslation();

    useEffect(() => {
        if (userId) {
            fetchResultsByUserId(userId);
        }
    }, []);

    const toBack = () => {
        history.back();
    }

    return (
        <ScreenLayout>
            <h1>{t('playerTitleScreen')}</h1>
            {loading ? (
                <VerticalCenterLayout> 
                    <IonSpinner/>
                </VerticalCenterLayout>
            ) : (
                <ColumnLayout withPadding style={{ paddingBottom: '50px' }}>
                    {resultsList.map((result) => (
                        <ExercisesResultCard key={result.id} {...result} />
                    ))}
                </ColumnLayout>
            )}
            <StickyBlock stickySide="bottom">
                <ColumnLayout withPadding fluid style={{ paddingBottom: '20px' }}>
                    <Button variant="clear" fluid onClick={toBack}>{t('toHome')}</Button>
                </ColumnLayout>
            </StickyBlock>
        </ScreenLayout>
    )
}