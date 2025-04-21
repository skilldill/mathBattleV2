import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import styles from './ScreenLayout.module.css';
import { PropsWithChildren } from 'react';

type ScreenLayoutProps = {
  title?: string;
}

export const ScreenLayout: React.FC<PropsWithChildren<ScreenLayoutProps>> = ({ children, title }) => {
  return (
    <IonPage>
      <IonHeader>
        {title && (
          <div className={styles.layout}>
            <IonToolbar>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
          </div>
        )}
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.layout}>
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};
