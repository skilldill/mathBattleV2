import { MathTaskDto } from "../../types/MathTaskDto";
import { Button } from "../Button/Button";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import styles from './MathTaskCard.module.css';
import { IonText } from "@ionic/react";
import { Block } from "../Glass/Block";
import { GameButton } from "../GameButton/GameButton";


interface MathTaskCardProps {
    task: MathTaskDto;
    onVariantClick: (variant: number) => void;
    currentNumber?: number;
    allTasksCount?: number;
}

export const MathTaskCard: React.FC<MathTaskCardProps> = ({ task, onVariantClick, currentNumber, allTasksCount }) => {
    const handleVariantClick = (variant: number) => {
        onVariantClick(variant);
    }

    const currentTaskNumber = currentNumber ? `${currentNumber} / ${allTasksCount}` : '';

    return (
        <Block>
            <div className={styles.mathTaskCard}>
                {currentNumber && allTasksCount && (
                    <div className={styles.currentTaskNumberLabel}>
                        <span className={styles.currentTaskNumber}>{currentTaskNumber}</span>
                    </div>
                )}
                <ColumnLayout>
                    <IonText>
                        <h1 className={styles.taskText}>{task.readableTask} = <IonText color="primary"><span className={styles.taskResult}>?</span></IonText></h1>
                    </IonText>
                    <div className={styles.variants}>
                        {task.variants.map((variant) => (
                            <GameButton key={variant} onClick={() => handleVariantClick(variant)}>
                                {variant}
                            </GameButton>
                        ))}
                    </div>
                </ColumnLayout>
            </div>
        </Block>
    );
};