import React, { useEffect, useState } from 'react';
import { useMathTasks } from '../../hooks/useMathTasks';
import { ColumnLayout, ScreenLayout } from '../../components';
import { IonButton, IonSpinner } from '@ionic/react';
import { VerticalCenterLayout } from '../../components/VerticalCenterLayout/VerticalCenterLayout';
import { MathTaskCard } from '../../components/MathTaskCard/MathTaskCard';
import { useHistory } from 'react-router';

export const PuzzlesScreen: React.FC = () => {
  const { fetchTasks, loading, tasks } = useMathTasks();
  const history = useHistory();

  const [currentTaskId, setCurrentTaskId] = useState<number>(0);

  useEffect(() => {
    fetchTasks(20, 'combo');
  }, []);

  const handleVariantClick = (variant: number) => {
    setCurrentTaskId((currentTaskId) => {
      if (currentTaskId < tasks.length - 1) {
        return currentTaskId + 1;
      }
      return currentTaskId;
    });
  }

  const handleFinishClick = () => {
    // history.push('/results');
    history.push('/');
  }

  return (
    <ScreenLayout title="Задачи">
      {loading ? (
        <VerticalCenterLayout>
          <IonSpinner></IonSpinner>
        </VerticalCenterLayout>
        ) : (
          <ColumnLayout>
            <MathTaskCard task={tasks[currentTaskId]} onVariantClick={handleVariantClick} />
          </ColumnLayout>
        )}
        <ColumnLayout>
          <IonButton size="large" fill="clear" color='danger' onClick={handleFinishClick}>Завершить</IonButton>
        </ColumnLayout>
    </ScreenLayout>
  );
};
