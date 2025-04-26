import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnLayout } from '../components';
import { Button } from '../components/Button/Button';
import { IonText } from '@ionic/react';
export const LanguageSelectionScreen: React.FC = () => {
  const { i18n } = useTranslation();

  const selectLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <ColumnLayout withPadding>
      <IonText>
        <h1>Выбери языка - Select Language</h1>
      </IonText>
      <Button onClick={() => selectLanguage('ru')}>Русский</Button>
      <Button onClick={() => selectLanguage('en')}>English</Button>
    </ColumnLayout>
  );
}; 