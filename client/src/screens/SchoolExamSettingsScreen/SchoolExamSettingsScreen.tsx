import { useExamsLevels } from "../../hooks/useExamsLevels";
import { useEffect } from "react";
import { Button, ColumnLayout,  VerticalCenterLayout } from "../../components";
import { IonSpinner } from "@ionic/react";
import { ExamLevelDto } from "../../types/ExamsLevelsDto";
import { useExamsLevelsStore } from "../../store/examsLevelsStore";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const SchoolExamSettingsScreen = () => {
    const history = useHistory();
    const { examsLevels, examLevelPlayed, loading, fetchExamsLevels } = useExamsLevels();
    const { selectedExamLevel, setSelectedExamLevel } = useExamsLevelsStore();
    const { t } = useTranslation();

    useEffect(() => {
        fetchExamsLevels();
    }, []);

    const handleSelectExamLevel = (examLevel: ExamLevelDto) => {
        setSelectedExamLevel(examLevel);
        history.push('/school-exam');
    }

    return (
        <ColumnLayout>
            <h1>{t(`schoolExam`)}</h1>
            {loading ? (
                <VerticalCenterLayout>
                    <IonSpinner />
                </VerticalCenterLayout>
            ) : (
                <ColumnLayout withPadding>
                    {examsLevels.map((examLevel, id) => (
                        <Button color={examLevelPlayed[id] ? 'success' : 'primary'} key={examLevel.level} onClick={() => handleSelectExamLevel(examLevel)}>
                            {t(`exam`)} {examLevel.level}
                        </Button>
                    ))}
                </ColumnLayout>
            )}
        </ColumnLayout>
    );
}