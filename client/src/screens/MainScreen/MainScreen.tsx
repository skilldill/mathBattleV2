import { IonButton, IonContent, IonImg, IonText, IonModal, useIonModal } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
import { ColumnLayout, ScreenLayout } from '../../components';
import { useState } from 'react';
import { AboutScreen } from '../AboutScreen/AboutScreen';
import { SettingsTasksScreen } from '../SettingsTasksScreen/SettingsTasksScreen';
import { useTelegramUser } from '../../hooks/useTelegramUser';
const MODAL_SCREENS = {
    aboutScreen: () => <AboutScreen />,
    settingsScreen: () => <SettingsTasksScreen />,
}

export const MainScreen: React.FC = () => {
    const [modalScreen, setModalScreen] = useState<keyof typeof MODAL_SCREENS>('aboutScreen');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const renderModalScreen = MODAL_SCREENS[modalScreen];
    const { user } = useTelegramUser();

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
            <IonText>
                <h2>
                    Привет, {user?.username}!
                </h2>
            </IonText>
            <ColumnLayout withPadding>
                <IonButton size='large' onClick={() => openModal('settingsScreen')}>
                    Проверить себя
                </IonButton>
                <IonButton color="success" size='large' onClick={() => openModal('aboutScreen')}>
                    О проекте
                </IonButton>
            </ColumnLayout>

            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                <IonContent>
                    <ColumnLayout withPadding>
                        {renderModalScreen()}
                        <IonButton onClick={() => setIsModalOpen(false)} size='large' color='primary' fill='clear'>
                            Закрыть
                        </IonButton>
                    </ColumnLayout>
                </IonContent>
            </IonModal>
        </ScreenLayout>
    );
};

