import React, { useEffect, useState } from 'react';
import { useMathTasks } from '../../hooks/useMathTasks';
import { ColumnLayout, ProgressBar, ScreenLayout } from '../../components';
import { IonActionSheet, IonButton, IonSpinner } from '@ionic/react';
import { VerticalCenterLayout } from '../../components/VerticalCenterLayout/VerticalCenterLayout';
import { MathTaskCard } from '../../components/MathTaskCard/MathTaskCard';
import { useHistory } from 'react-router';
import { useTimer } from '../../hooks/useTimer';
import { useTasksStore } from '../../store/tasksStore';


export const PuzzlesScreen: React.FC = () => {
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);

  const { fetchTasks, loading, tasks, checkAnswer, saveResult } = useMathTasks();
  const history = useHistory();
  const { count, difficulty } = useTasksStore();
  const { getTime, startTimer } = useTimer();

  const tasksReady = async () => {
    await fetchTasks(count, difficulty);
    startTimer();
  }

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

  const handleFinishClick = () => {
    // history.push('/results');
    // Добавь предупреждение о том, что нужно завершить задачу
    // Можно добавить action sheet с вопросом "Вы уверены, что хотите завершить задачу?"
    // Если пользователь нажмет "Да", то переходим на главную страницу
    // Если пользователь нажмет "Нет", то ничего не делаем
    // Можно добавить action sheet с вопросом "Вы уверены, что хотите завершить задачу?"
    // Если пользователь нажмет "Да", то переходим на главную страницу
    // Если пользователь нажмет "Нет", то ничего не делаем
    history.push('/');
  }

  return (
    <ScreenLayout title="Задачи">
      {loading ? (
        <VerticalCenterLayout>
          <IonSpinner></IonSpinner>
        </VerticalCenterLayout>
        ) : (
          <ColumnLayout withPadding>
            <ProgressBar progress={currentTaskId / tasks.length * 100} />
            <MathTaskCard task={tasks[currentTaskId]} onVariantClick={handleVariantClick} />
          </ColumnLayout>
        )}
        <ColumnLayout withPadding>
          <IonButton size="large" fill="clear" color='danger' id="open-action-sheet">Завершить</IonButton>
        </ColumnLayout>
        <IonActionSheet
          trigger="open-action-sheet"
          header="Результаты не сохранятся, точно хотите завершить?"
          buttons={[
            {
              text: 'Завершить',
              role: 'destructive',
              data: {
                action: 'close',
              },
            },
            {
              text: 'Отменить',
              role: 'cancel',
              data: {
                action: 'cancel',
              },
            },
          ]}
          onDidDismiss={(event) => {
            if (event.detail.data.action === 'close') {
              handleFinishClick();
            }
          }}
        ></IonActionSheet>
    </ScreenLayout>
  );
};
