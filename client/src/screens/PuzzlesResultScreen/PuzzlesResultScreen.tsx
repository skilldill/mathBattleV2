import { ColumnLayout, ScreenLayout } from "../../components";
import { useHistory, useParams } from "react-router";
import { useResults } from "../../hooks/useResults";
import { useEffect } from "react";
import { IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip } from "@ionic/react";
import { VerticalCenterLayout } from "../../components/VerticalCenterLayout/VerticalCenterLayout";
import { Button } from "../../components/Button/Button";
import { ResultTaskCard } from "../../components/ResultTaskCard/ResultTaskCard";
import { Block } from "../../components/Glass/Block";
import { ResultSummary } from "../../components/ResultSummary/ResultSummary";
import { useTranslation } from 'react-i18next';
import { StickyBlock } from "../../components/StickyBlock/StickyBlock";

export const PuzzlesResultScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { result, loading, fetchResultById } = useResults();
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        fetchResultById(id);
    }, []);

    return (
        <ScreenLayout>
            <ColumnLayout withPadding>
                {loading || !result ? (
                    <VerticalCenterLayout>
                        <IonSpinner></IonSpinner>
                    </VerticalCenterLayout>
                ) : (
                    <ColumnLayout>
                        <h1>{t('results')}</h1>
                        <ResultSummary result={result} />
                        {result.tasks.map((task) => (
                            <ResultTaskCard key={task.task} task={task} />
                        ))}
                    </ColumnLayout>
                )}
                <StickyBlock stickySide="bottom">
                    <ColumnLayout withPadding fluid style={{ paddingBottom: '20px' }}>
                        <Button variant="clear" onClick={() => history.push('/')}>{t('toHome')}</Button>
                    </ColumnLayout>
                </StickyBlock>
            </ColumnLayout>
        </ScreenLayout>
    );
};