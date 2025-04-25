import { Button } from "../Button/Button";
import { Block } from "../Glass/Block";
import { MathTaskResultDto } from "../../types/MathTaskDto";
import { IonText } from "@ionic/react";
import styles from './ResultTaskCard.module.css';
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import cn from 'classnames';
interface ResultTaskCardProps {
    task: MathTaskResultDto;
}

export const ResultTaskCard: React.FC<ResultTaskCardProps> = ({ task }) => {
    return (
        <Block>
            <p className={styles.taskDescription}>{task.task} = <span className={styles.taskResult}>{task.result}</span></p>
            <div>
                <ColumnLayout style={{ textAlign: 'left' }}>
                    <p className={cn(styles.taskAnswer, task.result === task.answer ? styles.successAnswer : styles.errorAnswer)}>Твой ответ: {task.answer}</p>
                    <p className={styles.taskTime}>Время выполнения: {(task.time / 1000).toFixed(1)} секунд</p>
                </ColumnLayout>
            </div>
        </Block>
    );
};