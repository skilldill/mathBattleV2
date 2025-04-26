import { ColumnLayout, TasksSetting } from "../../components";
import { useHistory } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import { Button } from "../../components/Button/Button";
import { useState } from "react";

export const SettingsTasksScreen: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(false);
  const { setCreateParams } = useTasksStore();
  const history = useHistory();

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
      <Button color='success' onClick={handleStart} disabled={!selectedDifficulty}>
        {selectedDifficulty ? 'Полетели!' : 'Выбери сложность'}
      </Button>
    </ColumnLayout>
  );
};
