import { Block } from "../Glass/Block";
import { MathTaskResultDto } from "../../types/MathTaskDto";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import cn from 'classnames';
import { msToSeconds } from "../../utils/timeUtils";
import styles from './ResultTaskCard.module.css';
import { useTranslation } from "react-i18next";

interface ResultTaskCardProps {
    task: MathTaskResultDto;
}

export const ResultTaskCard: React.FC<ResultTaskCardProps> = ({ task }) => {
    const { t } = useTranslation();

    return (
        <Block>
            <p className={styles.taskDescription}>{task.task} = <span className={styles.taskResult}>{task.result}</span></p>
            <div>
                <ColumnLayout style={{ textAlign: 'left' }}>
                    <p className={cn(styles.taskAnswer, {
                        [styles.successAnswer]: task.result === task.answer,
                        [styles.errorAnswer]: task.result !== task.answer,
                    })}>
                        {t('resultCardAnswerFieldTitle')}: {task.answer}
                    </p>
                    <p className={styles.taskTime}>{t('resultCardTimeFieldTitle')}: {msToSeconds(task.time)} {t('timeSecondsUnit')}</p>
                </ColumnLayout>
            </div>
        </Block>
    );
};
