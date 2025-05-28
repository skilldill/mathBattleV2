import React, { useState } from 'react';
import { Block } from "../Glass/Block";
import styles from './ResultSummary.module.css';
import { ResultDto } from '../../types/MathTaskDto';
import { ColumnLayout } from '../ColumnLayout/ColumnLayout';
import { calculateAverageTimePerTask, msToSeconds } from '../../utils/timeUtils';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { useShare } from '../../hooks/useShare';
import { IonToast } from '@ionic/react';

interface ResultSummaryProps {
    result: ResultDto;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({ result }) => {
    const { t } = useTranslation();
    const { handleShare, success, setSuccess } = useShare();

    const handleShareClick = () => {
        handleShare(result.id);
    }

    return (
        <Block>
            <ColumnLayout style={{ gap: '10px' }}>
                <p className={styles.resultText}>
                    {t('resultCardTotalExercisesFieldTitle')}: <span className={styles.resultTextValue}>{result.tasks.length}</span>
                </p>
                <p className={styles.resultText}>
                    {t('resultCardCorrectAnswersFieldTitle')}: <span className={styles.resultTextValue}>{result.tasks.filter((task) => task.result === task.answer).length}</span>
                </p>
                <p className={styles.resultText}>
                    {t('resultCardIncorrectAnswersFieldTitle')}: <span className={styles.resultTextValue}>{result.tasks.filter((task) => task.result !== task.answer).length}</span>
                </p>
                <p className={styles.resultText}>
                    {t('resultCardTotalTimeFieldTitle')}: <span className={styles.resultTextValue}>{msToSeconds(result.time)} {t('timeSecondsUnit')}</span>
                </p>
                <p className={styles.resultText}>
                    {t('resultCardAverageTimeFieldTitle')}: <span className={styles.resultTextValue}>{calculateAverageTimePerTask(result.time, result.tasks.length)} {t('timeSecondsUnit')}</span>
                </p>
                <div style={{ marginTop: '10px' }}>
                    <Button fluid size='small' onClick={handleShareClick}>
                        {t('share')}
                    </Button>
                </div>
                <IonToast
                    isOpen={success}
                    message={t('successCopiedToClipboard')}
                    duration={2000}
                    onDidDismiss={() => setSuccess(false)}
                    position="top"
                    color='success'
                />
            </ColumnLayout>
        </Block>
    );
};