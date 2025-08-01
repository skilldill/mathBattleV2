import { useTranslation } from "react-i18next";
import { Button, ColumnLayout, ScreenLayout } from "../../components";
import { LinearTimer } from "../../components/LinearTimer/LinearTimer";
import { useMathTasks } from "../../hooks/useMathTasks";
import { FC, useEffect, useState } from "react";
import { TasksCarousel } from "../../components/TasksCarousel/TasksCarousel";
import { MathTaskDto } from "../../types/MathTaskDto";
import { MathTaskCard } from "../../components/MathTaskCard/MathTaskCard";
import { useTimer } from "../../hooks/useTimer";
import styles from './SchoolExamScreen.module.css';
import { CountdownScreen } from "../../components/CountdownScreen/CountdownScreen";
import { PersonSprite } from "../../components/PersonSprite/PersonSprite";
import { useExamsLevelsStore } from "../../store/examsLevelsStore";
import { IonActionSheet } from "@ionic/react";
import { useHistory } from 'react-router';
import { ClassroomScene } from "../../components/ClassroomScene/ClassroomScene";

interface SchoolExamSceneProps {
  onRefresh: () => void;
}

export const SchoolExamScene: FC<SchoolExamSceneProps> = ({ onRefresh }) => {
  const { t } = useTranslation();
  const { fetchTasks, tasks, checkAnswer } = useMathTasks('/school-exam-result/');
  const { getTime, startTimer } = useTimer();
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<string>('normal');
  const { selectedExamLevel, selectedPerson, selectedScene } = useExamsLevelsStore();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const history = useHistory();
  
  const tasksReady = async () => {
    if (selectedExamLevel) {
      await fetchTasks(selectedExamLevel.questionCount, selectedExamLevel.difficulty);
      startTimer();
    }
  }

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

  useEffect(() => {
    tasksReady();
  }, []);

  useEffect(() => {
    if (isFinished) setEmotion('sad');
  }, [isFinished]);

  const handleFinish = () => {
    setIsFinished(true);
  }

  const handleTick = (_: number, percentageElapsed: number) => {
    console.log(percentageElapsed);
    if (percentageElapsed >= 50) {
      setEmotion('nervous');
    }
    if (percentageElapsed >= 75) {
      setEmotion('veryNervous');
    }
  }

  const handleActionClick = (event: any) => {
    if (event.detail.data.action === 'close') {
      history.push('/settings-school-exam');
    }
    if (event.detail.data.action === 'cancel') {
      setIsActionSheetOpen(false);
    }
  }

  const handleRetry = () => {
    onRefresh();
  }

  return (
    <ScreenLayout title={t('schoolExam')}>
      <ColumnLayout withPadding style={{ paddingBottom: '0px' }}>
        <LinearTimer seconds={selectedExamLevel?.timeSeconds || 20} onFinish={handleFinish} onTick={handleTick} />
      </ColumnLayout>
      <ColumnLayout withPadding style={{ paddingTop: '10px', paddingBottom: '0px' }}>
        <ClassroomScene scene={selectedScene} emotion={emotion}>
          <div className={styles.schoolboy}>
            <PersonSprite emotion={emotion} person={selectedPerson || 'girl'} />
          </div>

          {isFinished && (
            <div className={styles.finisedProfessor}>
              <PersonSprite person={selectedPerson !== 'professor' ? 'professor' : 'goose'} emotion="normal" />
            </div>
          )}
        </ClassroomScene>
      </ColumnLayout>

      {!isFinished && (
        <ColumnLayout withPadding style={{ paddingTop: '10px' }}>
          <TasksCarousel 
            items={tasks} 
            currentIndex={currentTaskId} 
            renderItem={(item: MathTaskDto) => 
              <MathTaskCard task={item} onVariantClick={handleVariantClick} currentNumber={currentTaskId + 1} allTasksCount={tasks.length} />} 
          />
        </ColumnLayout>
      )}

      {isFinished && (
          <ColumnLayout withPadding>
            <h1>{t('timeIsUp')}</h1>
            <div className={styles.finishedText}>
              <h4>{t('didntPassExam')}</h4>
            </div>
          </ColumnLayout>
        )}
      <ColumnLayout withPadding>
        {!isFinished && (
          <Button variant='outline' color='danger' onClick={() => setIsActionSheetOpen(true)}>{t('finish')}</Button>
        )}
        {isFinished && (
          <>
            <Button variant='outline' color="warning" onClick={handleRetry}>{t('examRetry')}</Button>
            <Button variant='outline' color='danger' onClick={() => history.push('/settings-school-exam')}>{t('toLeave')}</Button>
          </>
        )}
      </ColumnLayout>
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

export const SchoolExamScreen = () => {
  const { t } = useTranslation();


  // Это необходимо для того, чтобы перезагрузить сцену при нажатии на кнопку "Пересдать экзамен"
  const [sceneKey, setSceneKey] = useState<number>(0);

  const handleRefresh = () => {
    setSceneKey((sceneKey) => sceneKey + 1);
  }

  return (
    <CountdownScreen key={sceneKey} seconds={3} onFinish={() => {}} title={t('schoolExamStart')}>
      <SchoolExamScene onRefresh={handleRefresh} />
    </CountdownScreen>
  );
};