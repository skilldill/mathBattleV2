import React from 'react';
import { Block } from "../Glass/Block";
import styles from './ResultSummary.module.css';
import { ResultDto } from '../../types/MathTaskDto';
import { ColumnLayout } from '../ColumnLayout/ColumnLayout';
import { calculateAverageTimePerTask, msToSeconds } from '../../utils/timeUtils';

interface ResultSummaryProps {
    result: ResultDto;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({ result }) => {
    return (
        <Block>
            <ColumnLayout style={{ gap: '10px' }}>
                <p className={styles.resultText}>
                    Всего заданий: <span className={styles.resultTextValue}>{result.tasks.length}</span>
                </p>
                <p className={styles.resultText}>
                    Правильные ответы: <span className={styles.resultTextValue}>{result.tasks.filter((task) => task.result === task.answer).length}</span>
                </p>
                <p className={styles.resultText}>
                    Ошибки: <span className={styles.resultTextValue}>{result.tasks.filter((task) => task.result !== task.answer).length}</span>
                </p>
                <p className={styles.resultText}>
                    Время выполнения: <span className={styles.resultTextValue}>{msToSeconds(result.time)} секунд</span>
                </p>
                <p className={styles.resultText}>
                    Среднее время выполнения: <span className={styles.resultTextValue}>{calculateAverageTimePerTask(result.time, result.tasks.length)} секунд</span>
                </p>
            </ColumnLayout>
        </Block>
    );
};