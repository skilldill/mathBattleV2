import React from 'react';
import { ColumnLayout, ScreenLayout } from '../../components';
import { IonImg } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
import { useTranslation } from 'react-i18next';

export const AboutScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ height: '100%' }}>
      <IonImg src={MathBattleCoverPng} />
    </div>
  );
};
