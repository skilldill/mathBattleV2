import { useExamsLevels } from "../../hooks/useExamsLevels";
import { useEffect, useState } from "react";
import { Button, ColumnLayout,  ScreenLayout,  VerticalCenterLayout } from "../../components";
import { IonSpinner } from "@ionic/react";
import { ExamLevelDto } from "../../types/ExamsLevelsDto";
import { useExamsLevelsStore } from "../../store/examsLevelsStore";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PersonsSelect } from "../../components/PersonsSelect/PersonsSelect";
import { PersonsAvatar } from "../../components/PersonsAvatar/PersonsAvatar";
import { StickyBlock } from "../../components/StickyBlock/StickyBlock";
import { useUserStore } from "../../store/userStore";


export const SchoolExamSettingsScreen = () => {
    const history = useHistory();
    const { examsLevels, examLevelPlayed, loading, fetchExamsLevels, fetchExamLevelPlayed } = useExamsLevels();
    const { setSelectedExamLevel, selectedPerson, setSelectedPerson, clearSelectedPerson } = useExamsLevelsStore();
    const { t } = useTranslation();
    const { userId } = useUserStore();

    useEffect(() => {
        fetchExamsLevels();
        if (userId) {
            fetchExamLevelPlayed(userId);
        }
    }, [userId]);

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
            <ScreenLayout title={t('schoolExam')}>
                <ColumnLayout>
                    <h2>{t(`selectPerson`)}</h2>
                    <PersonsSelect onSelect={setSelectedPerson} disabledPersons={['professor', 'goose', 'dragon', 'ninja', 'pencil']} />
                </ColumnLayout>
                <StickyBlock stickySide="bottom">
                    <ColumnLayout withPadding fluid style={{ paddingBottom: '20px' }}>
                        <Button variant="clear" fluid onClick={() => history.push('/')}>{t('toHome')}</Button>
                    </ColumnLayout>
                </StickyBlock>
            </ScreenLayout>
        )
    }

    return (
        <ScreenLayout title={t('schoolExam')}>
            <ColumnLayout>
                <ColumnLayout withPadding>
                    <ColumnLayout>
                        <VerticalCenterLayout>
                            <PersonsAvatar person={selectedPerson} />
                        </VerticalCenterLayout>
                        <h2>{t(`selectExamLevel`)}</h2>
                    </ColumnLayout>
                    {examsLevels.map((examLevel, id) => (
                        <Button color={examLevelPlayed[id] ? 'success' : 'primary'} key={examLevel.level} onClick={() => handleSelectExamLevel(examLevel)}>
                            {t(`exam`)} {examLevel.level}
                        </Button>
                    ))}
                </ColumnLayout>
            </ColumnLayout>
            <StickyBlock stickySide="bottom">
                <ColumnLayout withPadding fluid style={{ paddingBottom: '20px' }}>
                    <Button variant="clear" fluid onClick={clearSelectedPerson}>{t('toSelectPerson')}</Button>
                </ColumnLayout>
            </StickyBlock>
        </ScreenLayout>
    );
}