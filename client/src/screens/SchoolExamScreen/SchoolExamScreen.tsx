import { useTranslation } from "react-i18next";
import { ColumnLayout, ScreenLayout } from "../../components";
import { LinearTimer } from "../../components/LinearTimer/LinearTimer";
import { useMathTasks } from "../../hooks/useMathTasks";
import { useEffect, useState } from "react";
import { TasksCarousel } from "../../components/TasksCarousel/TasksCarousel";
import { MathTaskDto } from "../../types/MathTaskDto";
import { MathTaskCard } from "../../components/MathTaskCard/MathTaskCard";
import { useTimer } from "../../hooks/useTimer";
import { Schoolboy } from "../../components/Schoolboy/Schoolboy";
import styles from './SchoolExamScreen.module.css';
import { CountdownScreen } from "../../components/CountdownScreen/CountdownScreen";
import cn from "classnames";
import { PersonSprite } from "../../components/PersonSprite/PersonSprite";

export const SchoolExamScene = () => {
  const { t } = useTranslation();
  const { fetchTasks, tasks, checkAnswer, saveResult } = useMathTasks('/school-exam-result/');
  const { getTime, startTimer } = useTimer();
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [schoolboyEmotion, setSchoolboyEmotion] = useState<string>('normal');

  const tasksReady = async () => {
    await fetchTasks(100, 'easy');
    startTimer();
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
    if (isFinished) saveResult(false);
  }, [isFinished]);

  const handleFinish = () => {
    setIsFinished(true);
  }

  const handleTick = (_: number, percentageElapsed: number) => {
    console.log(percentageElapsed);
    if (percentageElapsed >= 50) {
      setSchoolboyEmotion('nervous');
    }
    if (percentageElapsed >= 75) {
      setSchoolboyEmotion('veryNervous');
    }
  }

  return (
    <ScreenLayout title={t('')}>
      <ColumnLayout withPadding>
        <LinearTimer seconds={20} onFinish={handleFinish} onTick={handleTick} />
      </ColumnLayout>
      <ColumnLayout withPadding>
        <div className={cn(styles.classroom, styles[schoolboyEmotion])}>
          <div className={styles.schoolboy}>
            <PersonSprite emotion={schoolboyEmotion} person="professor" />
          </div>
        </div>
      </ColumnLayout>
      <ColumnLayout withPadding>
        <TasksCarousel 
          items={tasks} 
          currentIndex={currentTaskId} 
          renderItem={(item: MathTaskDto) => 
            <MathTaskCard task={item} onVariantClick={handleVariantClick} />} 
        />
      </ColumnLayout>
    </ScreenLayout>
  );
};

export const SchoolExamScreen = () => {
  const { t } = useTranslation();

  return (
    <CountdownScreen seconds={3} onFinish={() => {}} title={t('schoolExamStart')}>
      <SchoolExamScene />
    </CountdownScreen>
  );
};