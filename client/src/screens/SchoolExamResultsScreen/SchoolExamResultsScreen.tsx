import { useHistory, useParams } from "react-router";
import { useResults } from "../../hooks/useResults";
import { useEffect, useState } from "react";
import { Button, ColumnLayout, ScreenLayout, VerticalCenterLayout } from "../../components";
import { useTranslation } from "react-i18next";
import { StickyBlock } from "../../components/StickyBlock/StickyBlock";
import { useExamsLevelsStore } from "../../store/examsLevelsStore";
import { PersonSprite } from "../../components/PersonSprite/PersonSprite";
import { ResultSummary } from "../../components/ResultSummary/ResultSummary";
import { checkExamPassed } from "../../utils/checkExamPassed";
import { useExamsLevels } from "../../hooks/useExamsLevels";
import { useUserStore } from "../../store/userStore";
import styles from './SchoolExamResultsScreen.module.css';

export const SchoolExamResultsScreen = () => {
  const { id } = useParams<{ id: string }>();
  const { result, loading, fetchResultById } = useResults();
  const { selectedPerson, selectedExamLevel } = useExamsLevelsStore();
  const { userId } = useUserStore();
  const { saveExamLevelPlayed } = useExamsLevels();
  const [isPassed, setIsPassed] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    fetchResultById(id);
  }, []);

  useEffect(() => {
    if (result && selectedExamLevel) {
      const isPassed = checkExamPassed(result, selectedExamLevel);
      setIsPassed(isPassed);
    }
  }, [result]);

  useEffect(() => {
    if (userId && isPassed && result && selectedExamLevel) {
      saveExamLevelPlayed({
        userId,
        totalTimeSeconds: result.time,
        totalMistakes: result.tasks.filter((task) => task.result !== task.answer).length,
        ...selectedExamLevel,
      });
    }
  }, [isPassed]);

  const { t } = useTranslation();

  return (
    <ScreenLayout title={t('schoolExamResults')}> 
      <h1>School Exam Results</h1>
      <ColumnLayout>
        <VerticalCenterLayout>
          <PersonSprite person={selectedPerson || 'girl'} emotion={isPassed ? 'happy' : 'sad'} />
        </VerticalCenterLayout>
        <VerticalCenterLayout>
          <div className={styles.finishedText}>
            <h4>{isPassed ? t('passedExam') : t('didntPassExam')}</h4>
          </div>
        </VerticalCenterLayout>
      </ColumnLayout>
      <ColumnLayout withPadding>
        {result && <ResultSummary result={result} />}
      </ColumnLayout>
      <StickyBlock stickySide="bottom">
        <ColumnLayout withPadding fluid style={{ paddingBottom: '20px', width: '100%' }}>
          <Button variant='outline' fluid color="warning" onClick={() => history.push('/school-exam')}>{t('examRetry')}</Button>
          <Button variant="clear" fluid onClick={() => history.push('/settings-school-exam')}>{t('toLeave')}</Button>
        </ColumnLayout>
      </StickyBlock>
    </ScreenLayout>
  );
};
