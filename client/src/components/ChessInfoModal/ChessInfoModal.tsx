import { IonModal, IonContent, IonImg } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { ColumnLayout } from '../ColumnLayout/ColumnLayout';
import { Button } from '../Button/Button';
import { StickyBlock } from '../StickyBlock/StickyBlock';
import { IonText } from '@ionic/react';
import styles from './ChessInfoModal.module.css';
import { useEffect, useState } from 'react';
import ChessBoard3D from '../../assets/chess3d.png';

const CHESS_MODAL_SHOWN_KEY = 'promo:chessOnModalShown';

export const ChessInfoModal: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const openChessModal = () => {
        setIsOpen(true);
    };

    // @ts-ignore
    const openChesson = () => {
        const utm = 'utm_source=mathbattle';
        const url = `https://chesson.me/?${utm}`;

        // @ts-ignore
        if (Telegram && Telegram.WebApp && typeof Telegram.WebApp.openLink === 'function') {
            // @ts-ignore
            Telegram.WebApp.openLink(url);
        } else {
            window.open(url, '_blank');
        }
    };

    useEffect(() => {
    
    if (typeof window !== 'undefined' && window.localStorage) {
        const alreadyShown = window.localStorage.getItem(CHESS_MODAL_SHOWN_KEY);
        if (!alreadyShown) {
            setTimeout(() => {
                setIsOpen(true);
                window.localStorage.setItem(CHESS_MODAL_SHOWN_KEY, 'true');
            }, 2000)
        }
    }
    }, [])

    return (
        <>
            <button 
                className={styles.chessButton}
                onClick={openChessModal}
            >
                {t('chessButtonText')}
            </button>
            <IonModal isOpen={isOpen} onDidDismiss={handleClose}>
                <IonContent>
                    <ColumnLayout withPadding style={{ backgroundColor: '#000000', minHeight: '100%' }}>
                        <div className={styles.content}>
                            <IonText>
                                <h1 className={styles.title}>{t('chessInfoModalTitle')}</h1>
                            </IonText>
                            <IonText>
                                <p className={styles.description}>{t('chessInfoModalDescription')}</p>
                            </IonText>
                            <div className={styles.chessboard3d}>
                                <IonImg src={ChessBoard3D} />
                            </div>
                        </div>
                        <StickyBlock stickySide='bottom'>
                            <div style={{ width: '100%', padding: '10px 0px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <button 
                                    className={styles.chessButton}
                                    onClick={openChesson}
                                >
                                    {t('chessInfoModalButtonText')}
                                </button>
                                <Button 
                                    variant="clear" 
                                    onClick={handleClose} 
                                    fluid
                                >
                                    {t('later')}
                                </Button>
                            </div>
                        </StickyBlock>
                    </ColumnLayout>
                </IonContent>
            </IonModal>
        </>
    );
};
