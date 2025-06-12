import React, { useEffect, useState } from 'react';
import { useMathTasks } from '../../hooks/useMathTasks';
import { ColumnLayout, ProgressBar, ScreenLayout } from '../../components';
import { IonActionSheet, IonSpinner } from '@ionic/react';
import { VerticalCenterLayout } from '../../components/VerticalCenterLayout/VerticalCenterLayout';
import { MathTaskCard } from '../../components/MathTaskCard/MathTaskCard';
import { useHistory } from 'react-router';
import { useTimer } from '../../hooks/useTimer';
import { useTasksStore } from '../../store/tasksStore';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';


type PuzzlesScreenProps = {
  isRating: boolean;
}

export const PuzzlesScreen: React.FC<PuzzlesScreenProps> = ({ isRating }) => {
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);

  const { fetchTasks, loading, tasks, checkAnswer, setIsRating } = useMathTasks();
  const history = useHistory();
  const { count, difficulty } = useTasksStore();
  const { getTime, startTimer } = useTimer();
  const { t } = useTranslation();

  const tasksReady = async () => {
    await fetchTasks(count, difficulty);
    startTimer();
  }

  useEffect(() => {
    setIsRating(isRating);
  }, [isRating]);

  useEffect(() => {
    tasksReady();
  }, []);

  const handleVariantClick = (variant: number) => {
    checkAnswer({ answer: variant, time: getTime() });

    setCurrentTaskId((currentTaskId) => {
      if (currentTaskId < tasks.length - 1) {
        startTimer();
        return currentTaskId + 1;
      }
      return currentTaskId;
    });
  }

  const handleActionClick = (event: any) => {
    if (event.detail.data.action === 'close') {
      history.push('/');
    }
    if (event.detail.data.action === 'cancel') {
      setIsActionSheetOpen(false);
    }
  }

  return (
    <ScreenLayout title={t('solvingExercisesTitle')}>
      {loading ? (
        <VerticalCenterLayout>
          <IonSpinner></IonSpinner>
        </VerticalCenterLayout>
      ) : tasks.length === 0 ? (
        <VerticalCenterLayout>
          <ColumnLayout>
            <h2>{t('noTasksAvailable')} 🤷‍♂️</h2>
            <Button variant='outline' onClick={() => history.push('/')}>
              {t('toHome')}
            </Button>
          </ColumnLayout>
        </VerticalCenterLayout>
      ) : (
        <>
          <ColumnLayout withPadding>
            <ProgressBar progress={currentTaskId / tasks.length * 100} />
            <MathTaskCard task={tasks[currentTaskId]} onVariantClick={handleVariantClick} />
          </ColumnLayout>
          <ColumnLayout withPadding>
            <Button variant='outline' color='danger' onClick={() => setIsActionSheetOpen(true)}>{t('finish')}</Button>
          </ColumnLayout>
        </>
      )}
      <IonActionSheet
        isOpen={isActionSheetOpen}
        header={t('actionSheetFinishTitle')}
        buttons={[
          {
            text: t('finish'),
            role: 'destructive',
            data: {
              action: 'close',
            },
          },
          {
            text: t('continueSolving'),
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ]}
        onDidDismiss={handleActionClick}
        onWillDismiss={() => setIsActionSheetOpen(false)}
      ></IonActionSheet>
    </ScreenLayout>
  );
};
