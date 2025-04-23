import React, { useEffect, useState } from 'react';
import { useMathTasks } from '../../hooks/useMathTasks';
import { ColumnLayout, ProgressBar, ScreenLayout } from '../../components';
import { IonButton, IonSpinner } from '@ionic/react';
import { VerticalCenterLayout } from '../../components/VerticalCenterLayout/VerticalCenterLayout';
import { MathTaskCard } from '../../components/MathTaskCard/MathTaskCard';
import { useHistory } from 'react-router';
import { useTimer } from '../../hooks/useTimer';

export const PuzzlesScreen: React.FC = () => {
  const { fetchTasks, loading, tasks, checkAnswer, saveResult } = useMathTasks();
  const history = useHistory();
  const { getTime, startTimer } = useTimer();
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);

  const tasksReady = async () => {
    await fetchTasks(20, 'combo');
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
          <IonButton size="large" fill="clear" color='danger' onClick={handleFinishClick}>Завершить</IonButton>
        </ColumnLayout>
    </ScreenLayout>
  );
};
