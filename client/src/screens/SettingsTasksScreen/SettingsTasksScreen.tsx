import { ColumnLayout, TasksSetting } from "../../components";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import { Button } from "../../components/Button/Button";

export const SettingsTasksScreen: React.FC = () => {
  const { count, difficulty, setCreateParams } = useTasksStore();
  const history = useHistory();

  const handleClick = (count: number, difficulty: string) => {
    setCreateParams(count, difficulty);
  }

  const handleStart = () => {
    history.push('/puzzles');
  }

  return (
    <ColumnLayout>
      <TasksSetting onClick={handleClick} />
      <Button color='success' onClick={handleStart} disabled={!count || !difficulty}>
        Полетели!
      </Button>
    </ColumnLayout>
  );
};
