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

export const SchoolExamScreen = () => {
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
        <LinearTimer seconds={600} onFinish={handleFinish} onTick={handleTick} />
      </ColumnLayout>
      <ColumnLayout withPadding>
        <div className={styles.classroom}>
          <div className={styles.schoolboy}>
            <Schoolboy emotion={schoolboyEmotion} />
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