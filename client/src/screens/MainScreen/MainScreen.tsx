import { IonButton, IonIcon, IonImg, IonText, IonModal, useIonModal } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
import { ColumnLayout, ScreenLayout } from '../../components';
import { useState } from 'react';
import { AboutScreen } from '../AboutScreen/AboutScreen';
import { SettingsTasksScreen } from '../SettingsTasksScreen/SettingsTasksScreen';

const MODAL_SCREENS = {
  aboutScreen: () => <AboutScreen />,
  settingsScreen: () => <SettingsTasksScreen />,
}

export const MainScreen: React.FC = () => {
  const [modalScreen, setModalScreen] = useState<keyof typeof MODAL_SCREENS>('aboutScreen');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderModalScreen = MODAL_SCREENS[modalScreen];

  const openModal = (screen: keyof typeof MODAL_SCREENS) => {
    setModalScreen(screen);
    setIsModalOpen(true);
  } 

  return (
    <ScreenLayout>
      <IonText>
        <h1>Math Battle</h1>
      </IonText>
      <IonImg src={MathBattleCoverPng} />

      <ColumnLayout>
        <IonButton size='large' onClick={() => openModal('settingsScreen')}>
            Проверить себя
        </IonButton>
        <IonButton color="success" size='large' onClick={() => openModal('aboutScreen')}>
            О проекте
        </IonButton>
      </ColumnLayout>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <ScreenLayout>
          {renderModalScreen()}
          <IonButton onClick={() => setIsModalOpen(false)}>
            Закрыть
          </IonButton>
        </ScreenLayout>
      </IonModal>
    </ScreenLayout>
  );
};
