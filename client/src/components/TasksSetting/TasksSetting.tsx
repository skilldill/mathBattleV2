import React, { useState } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { ColumnLayout } from '../ColumnLayout/ColumnLayout';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';

type TaskSettingProps = {
    onClick: (count: number, difficulty: string) => void;
}

export const TasksSetting: React.FC<TaskSettingProps> = ({ onClick }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const { t } = useTranslation();

    const handleClick = (count: number, difficulty: string, description: string) => {
        setSelectedDifficulty(description);
        onClick(count, difficulty);
    }

    return (
        <ColumnLayout>
            <IonText>
                <h4>{selectedDifficulty ? selectedDifficulty : `${t('chooseDifficulty')}👇`}</h4>
            </IonText>
            <Button onClick={() => handleClick(10, 'easy-light', t('babyStatus'))}>
                {t('baby')}
            </Button>
            <Button onClick={() => handleClick(10, 'easy', t('schoolboyStatus'))}>
                {t('schoolboy')}
            </Button>
            <Button onClick={() => handleClick(15, 'medium', t('studentStatus'))}>
                {t('student')}
            </Button>
            <Button onClick={() => handleClick(20, 'combo', t('ninjaStatus'))}>
                {t('ninja')}
            </Button>
        </ColumnLayout>
    );
};

