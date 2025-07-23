import { useTranslation } from "react-i18next";
import { ColumnLayout, ScreenLayout } from "../../components";
import { LinearTimer } from "../../components/LinearTimer/LinearTimer";
import { useMathTasks } from "../../hooks/useMathTasks";
import { useEffect, useState } from "react";
import { TasksCarousel } from "../../components/TasksCarousel/TasksCarousel";
import { MathTaskDto } from "../../types/MathTaskDto";
import { MathTaskCard } from "../../components/MathTaskCard/MathTaskCard";
import { useTimer } from "../../hooks/useTimer";

export const SchoolExamScreen = () => {
  const { t } = useTranslation();
  const { fetchTasks, tasks, checkAnswer, saveResult } = useMathTasks('/school-exam-result/');
  const { getTime, startTimer } = useTimer();
  const [currentTaskId, setCurrentTaskId] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

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

  return (
    <ScreenLayout title={t('')}>
      <ColumnLayout withPadding>
        <LinearTimer seconds={5} onFinish={handleFinish} />
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