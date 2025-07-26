import { useExamsLevels } from "../../hooks/useExamsLevels";
import { useEffect, useState } from "react";
import { Button, ColumnLayout,  VerticalCenterLayout } from "../../components";
import { IonSpinner } from "@ionic/react";
import { ExamLevelDto } from "../../types/ExamsLevelsDto";
import { useExamsLevelsStore } from "../../store/examsLevelsStore";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PersonsSelect } from "../../components/PersonsSelect/PersonsSelect";
import { PersonSprite } from "../../components/PersonSprite/PersonSprite";
export const SchoolExamSettingsScreen = () => {
    const history = useHistory();
    const { examsLevels, examLevelPlayed, loading, fetchExamsLevels } = useExamsLevels();
    const { setSelectedExamLevel, selectedPerson, setSelectedPerson } = useExamsLevelsStore();
    const { t } = useTranslation();

    useEffect(() => {
        fetchExamsLevels();
    }, []);

    const handleSelectExamLevel = (examLevel: ExamLevelDto) => {
        setSelectedExamLevel(examLevel);
        history.push('/school-exam');
    }

    if (loading) {
        return (
            <ColumnLayout>
                <IonSpinner />
            </ColumnLayout>
        )
    }

    if (!selectedPerson) {
        return (
            <ColumnLayout>
                <h1>{t(`schoolExam`)}</h1>
                <h2>{t(`selectPerson`)}</h2>
                <PersonsSelect onSelect={setSelectedPerson} />
            </ColumnLayout>
        )
    }

    return (
        <ColumnLayout>
            <h1>{t(`schoolExam`)}</h1>
            <ColumnLayout withPadding>
                <PersonSprite person={selectedPerson} emotion="normal" />
                {examsLevels.map((examLevel, id) => (
                    <Button color={examLevelPlayed[id] ? 'success' : 'primary'} key={examLevel.level} onClick={() => handleSelectExamLevel(examLevel)}>
                        {t(`exam`)} {examLevel.level}
                    </Button>
                ))}
            </ColumnLayout>
        </ColumnLayout>
    );
}