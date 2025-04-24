import { ColumnLayout, TasksSetting } from "../../components";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";

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
    <ColumnLayout withPadding>
      <TasksSetting onClick={handleClick} />
      <IonButton size="large" onClick={handleStart} disabled={!count || !difficulty}>
        Полетели!
      </IonButton>
    </ColumnLayout>
  );
};
