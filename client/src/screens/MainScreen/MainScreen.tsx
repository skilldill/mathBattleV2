import { IonContent, IonImg, IonText, IonModal } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
import { ColumnLayout, ScreenLayout } from '../../components';
import { useState } from 'react';
import { AboutScreen } from '../AboutScreen/AboutScreen';
import { SettingsTasksScreen } from '../SettingsTasksScreen/SettingsTasksScreen';
import { useHistory } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { Button } from '../../components/Button/Button';
import { SettingsDailyRatingsScreen } from '../SettingsDailyRatingsScreen/SettingsDailyRatingsScreen';
import { RatingsScreen } from '../RatingsScreen/RatingsScreen';
import { useTranslation } from 'react-i18next';
import { BlockForAuthUser } from '../../components/BlockForAuthUser/BlockForAuthUser';
import { StickyBlock } from '../../components/StickyBlock/StickyBlock';

const MODAL_SCREENS = {
    aboutScreen: () => <AboutScreen />,
    settingsScreen: () => <SettingsTasksScreen />,
    settingsDailyRatingsScreen: () => <SettingsDailyRatingsScreen />,
    ratingsScreen: () => <RatingsScreen />,
}

export const MainScreen: React.FC = () => {
    const [modalScreen, setModalScreen] = useState<keyof typeof MODAL_SCREENS>('aboutScreen');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const renderModalScreen = MODAL_SCREENS[modalScreen];
    const history = useHistory();
    const userName = useUserStore((state) => state.userName);
    const { t } = useTranslation();

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
                <h1>{t('mathBattle')}</h1>
            </IonText>
            <ColumnLayout withPadding style={{ alignItems: 'center' }}>
                <IonImg src={MathBattleCoverPng} style={{ width: '280px' }} />
            </ColumnLayout>
            <IonText>
                <h2>
                    {t('greeting', { userName: userName || t('defaultUsername') })}
                </h2>
            </IonText>

            <ColumnLayout withPadding>
                <BlockForAuthUser>
                    <Button color='success' onClick={() => openModal('ratingsScreen')}>
                        {t('ratingGameButtonText')}
                    </Button>
                </BlockForAuthUser>
                <Button onClick={() => openModal('settingsScreen')}>
                    {t('trainingGameButtonText')}
                </Button>
                <BlockForAuthUser>
                    <Button onClick={() => history.push('/player')}>
                        {t('playerTitleScreen')}
                    </Button>
                </BlockForAuthUser>
            </ColumnLayout>

            <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
                <IonContent>
                    <ColumnLayout withPadding style={{ backgroundColor: '#000000', minHeight: '100%' }}>
                        {renderModalScreen()}
                        <StickyBlock stickySide='bottom'>
                        <div style={{ width: '100%', padding: '10px 0px' }}>
                            <Button variant="clear"  onClick={() => setIsModalOpen(false)} fluid>
                                {t('toHome')}
                            </Button>
                        </div>
                    </StickyBlock>
                    </ColumnLayout>
                </IonContent>
            </IonModal>
        </ScreenLayout>
    );
};

