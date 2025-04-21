import { ColumnLayout } from "../../components";
import { IonText, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

export const SettingsTasksScreen: React.FC = () => {
  const history = useHistory();

  return (
    <ColumnLayout>
      <IonText>
        <h1>Проверь свои <br /> математические способности!</h1>
      </IonText>
      <IonText>
        <p>🔥 Готов прокачать свои мозги? Сейчас я закину тебе 20 бодрых математических примеров!</p>
        <p>
          Твоя задача — решить их как можно быстрее.

          Когда закончишь — я сразу выдам тебе результат: сколько правильных и за сколько времени ты справился.
        </p>
        <p>
          💥 Если ты готов — жми “Полетели!”
        </p>
      </IonText>
      <IonButton size="large" onClick={() => history.push('/puzzles')}>
        Полетели!
      </IonButton>
    </ColumnLayout>
  );
};
