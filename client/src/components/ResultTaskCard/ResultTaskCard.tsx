import { Block } from "../Glass/Block";
import { MathTaskResultDto } from "../../types/MathTaskDto";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import cn from 'classnames';
import { msToSeconds } from "../../utils/timeUtils";
import styles from './ResultTaskCard.module.css';


interface ResultTaskCardProps {
    task: MathTaskResultDto;
}

export const ResultTaskCard: React.FC<ResultTaskCardProps> = ({ task }) => {
    return (
        <Block>
            <p className={styles.taskDescription}>{task.task} = <span className={styles.taskResult}>{task.result}</span></p>
            <div>
                <ColumnLayout style={{ textAlign: 'left' }}>
                    <p className={cn(styles.taskAnswer, {
                        [styles.successAnswer]: task.result === task.answer,
                        [styles.errorAnswer]: task.result !== task.answer,
                    })}>
                        Твой ответ: {task.answer}
                    </p>
                    <p className={styles.taskTime}>Время выполнения: {msToSeconds(task.time)} секунд</p>
                </ColumnLayout>
            </div>
        </Block>
    );
};
