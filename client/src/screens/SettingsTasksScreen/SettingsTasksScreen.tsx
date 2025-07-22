import { ColumnLayout, TasksSetting } from "../../components";
import { useHistory } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import { Button } from "../../components/Button/Button";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { AnimatedActiveBlock } from "../../components/AnimatedActiveBlock/AnimatedActiveBlock";

export const SettingsTasksScreen: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(false);
  const { setCreateParams } = useTasksStore();
  const history = useHistory();
  const { t } = useTranslation();
  const handleClick = (count: number, difficulty: string) => {
    setCreateParams(count, difficulty);
    setSelectedDifficulty(true);
  }

  const handleStart = () => {
    history.push('/puzzles');
  }

  return (
    <ColumnLayout>
      <TasksSetting onClick={handleClick} />
      <AnimatedActiveBlock isActive={false}>
        <Button style={{ width: '100%' }} color='success' onClick={handleStart} disabled={!selectedDifficulty}>
          {selectedDifficulty ? t('startTrainingGame') : t('chooseDifficulty')}
        </Button>
      </AnimatedActiveBlock>
    </ColumnLayout>
  );
};
