import { MathTaskDto } from "../../types/MathTaskDto";
import { Button } from "../Button/Button";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import styles from './MathTaskCard.module.css';
import { IonButton, IonText } from "@ionic/react";
interface MathTaskCardProps {
    task: MathTaskDto;
    onVariantClick: (variant: number) => void;
}

export const MathTaskCard: React.FC<MathTaskCardProps> = ({ task, onVariantClick }) => {
    
    const handleVariantClick = (variant: number) => {
        onVariantClick(variant);
    }

    return (
        <div className={styles.mathTaskCard}>
            <ColumnLayout>
                <IonText>
                    <h1 className={styles.taskText}>{task.readableTask} = <IonText color="primary"><span className={styles.taskResult}>?</span></IonText></h1>
                </IonText>
                <div className={styles.variants}>
                    {task.variants.map((variant) => (
                        <Button key={variant} onClick={() => handleVariantClick(variant)}>
                            {variant}
                        </Button>
                    ))}
                </div>
            </ColumnLayout>
        </div>
    );
};