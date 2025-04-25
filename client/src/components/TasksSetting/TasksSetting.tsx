import React, { useState } from 'react';
import { IonButton, IonText } from '@ionic/react';
import { ColumnLayout } from '../ColumnLayout/ColumnLayout';
import { Button } from '../Button/Button';

type TaskSettingProps = {
    onClick: (count: number, difficulty: string) => void;
}

export const TasksSetting: React.FC<TaskSettingProps> = ({ onClick }) => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

    const handleClick = (count: number, difficulty: string, description: string) => {
        setSelectedDifficulty(description);
        onClick(count, difficulty);
    }

    return (
        <ColumnLayout>
            <IonText>
                <h4>{selectedDifficulty ? `Выбрано: ${selectedDifficulty}` : 'Выбери сложность 👇'}</h4>
            </IonText>
            <Button onClick={() => handleClick(10, 'easy', 'Малыш 👶')}>
                👶 Малыш - 10 примеров 
            </Button>
            <Button onClick={() => handleClick(10, 'medium', 'Школьник 👦')}>
                👦 Школьник - 10 примеров
            </Button>
            <Button onClick={() => handleClick(10, 'hard', 'Студент 👨‍🎓')}>
                👨‍🎓 Студент - 10 примеров
            </Button>
            <Button onClick={() => handleClick(20, 'combo', 'Ниндзя 🥷')}>
                🥷 Ниндзя - 20 примеров, от простых до сложных
            </Button>
        </ColumnLayout>
    );
};

