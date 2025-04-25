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

export const PuzzlesResultScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { result, loading, fetchResultById } = useResults();
    const history = useHistory();

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
                        <h1>Результаты</h1>
                        <ResultSummary result={result} />
                        {result.tasks.map((task) => (
                            <ResultTaskCard key={task.task} task={task} />
                        ))}
                    </ColumnLayout>
                )}
                <Button onClick={() => history.push('/')}>На главную</Button>
            </ColumnLayout>
        </ScreenLayout>
    );
};