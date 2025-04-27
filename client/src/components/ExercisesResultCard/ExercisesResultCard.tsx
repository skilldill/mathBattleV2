import { Block } from "../Glass/Block";
import styles from './ExercisesResultCard.module.css';
import { ResultListDto } from "../../types/MathTaskDto";
import { useHistory } from "react-router-dom";
import { msToSeconds } from "../../utils/timeUtils";
import { useTranslation } from "react-i18next";
import { useDifficulty } from "../../hooks/useDifficulty";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import { Button } from "../Button/Button";
type ExercisesResultCardProps = ResultListDto;

export const ExercisesResultCard: React.FC<ExercisesResultCardProps> = ({ taskCount, time, difficulty, date, id, totalErrors, totalCorrectAnswers, isRating }) => {
    const history = useHistory();
    const { t } = useTranslation();
    const { getDifficulty } = useDifficulty();

    const handleClick = () => {
        history.push(`/puzzles-result/${id}`);
    }
    
    return (
        <Block>
            <ColumnLayout>
                <p className={styles.resultText}>{t('resultCardDifficultyFieldTitle')}: <span className={styles.resultTextValue}>{getDifficulty(difficulty)}</span></p>
                <p className={styles.resultText}>{t('resultCardTimeFieldTitle')}: <span className={styles.resultTextValue}>{msToSeconds(time)} {t('timeSecondsUnit')}</span></p>
                <p className={styles.resultText}>{t('resultCardTotalErrorsFieldTitle')}: <span className={styles.resultTextValue}>{totalErrors > 0 ? `${totalErrors} ⚠️` : totalErrors}</span></p>
                <p className={styles.resultText}>{t('resultCardTotalCorrectAnswersFieldTitle')}: <span className={styles.resultTextValue}>{totalCorrectAnswers}</span></p>
                <Button size="small" onClick={handleClick}>
                    {t('resultCardOpenButtonText')}
                </Button>
            </ColumnLayout>
        </Block>
    )
}