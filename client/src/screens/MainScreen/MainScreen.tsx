import { IonContent, IonImg, IonText, IonModal } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
import { ColumnLayout, ScreenLayout } from '../../components';
import { useState } from 'react';
import { AboutScreen } from '../AboutScreen/AboutScreen';
import { SettingsTasksScreen } from '../SettingsTasksScreen/SettingsTasksScreen';
import { useHistory } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/Button/Button';


const MODAL_SCREENS = {
    aboutScreen: () => <AboutScreen />,
    settingsScreen: () => <SettingsTasksScreen />,
}

export const MainScreen: React.FC = () => {
    const [modalScreen, setModalScreen] = useState<keyof typeof MODAL_SCREENS>('aboutScreen');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const renderModalScreen = MODAL_SCREENS[modalScreen];
    const history = useHistory();
    const userName = useUserStore((state) => state.userName);

    const openModal = (screen: keyof typeof MODAL_SCREENS) => {
        setModalScreen(screen);
        setIsModalOpen(true);
    }

    // Может понадобится для открытия экрана с технической поддержкой
    const openTechDevScreen = () => {
        history.push('/tech-dev');
    }

    return (
        <ScreenLayout>
            <IonText>
                <h1>Math Battle</h1>
            </IonText>
            <IonImg src={MathBattleCoverPng} />
            <IonText>
                <h2>
                    Привет, {userName || 'математик'}!
                </h2>
            </IonText>
            <ColumnLayout withPadding>
                <Button onClick={() => openModal('settingsScreen')}>
                    Проверить себя
                </Button>
                <Button variant='outline' onClick={() => openModal('aboutScreen')}>
                    О проекте
                </Button>
            </ColumnLayout>

            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                <IonContent>
                    <ColumnLayout withPadding style={{ backgroundColor: '#000000', height: '100%' }}>
                        {renderModalScreen()}
                        <Button variant='clear' onClick={() => setIsModalOpen(false)}>
                            На главную
                        </Button>
                    </ColumnLayout>
                </IonContent>
            </IonModal>
        </ScreenLayout>
    );
};

