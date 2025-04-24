import { ColumnLayout, ScreenLayout } from "../../components";
import { useHistory, useParams } from "react-router";
import { useResults } from "../../hooks/useResults";
import { useEffect } from "react";
import { IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonButton } from "@ionic/react";
import { VerticalCenterLayout } from "../../components/VerticalCenterLayout/VerticalCenterLayout";

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
                        {result.tasks.map((task) => (
                            <IonCard key={task.task}>
                                <IonCardHeader>
                                    <IonCardTitle>{task.task}</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonChip>
                                        Ответ должен быть: {task.result}
                                    </IonChip>
                                    <IonChip color={task.result === task.answer ? 'success' : 'danger'}>
                                        Твой ответ: {task.answer}
                                    </IonChip>
                                    <IonChip>
                                        Время: {(task.time / 1000).toFixed(1)} секунд
                                    </IonChip>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </ColumnLayout>
                )}
                <IonButton onClick={() => history.push('/')}>На главную</IonButton>
            </ColumnLayout>
        </ScreenLayout>
    );
};