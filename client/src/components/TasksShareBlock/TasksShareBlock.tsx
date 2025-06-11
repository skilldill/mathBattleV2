import { useTranslation } from "react-i18next";
import { ButtonShareTasks } from "../ButtonShareTasks/ButtonShareTasks";
import { Block } from "../Glass/Block";
import { ColumnLayout } from "../ColumnLayout/ColumnLayout";
import { ResultDto } from "../../types/MathTaskDto";

type TasksShareBlockProps = {
    result: ResultDto;
}

export const TasksShareBlock: React.FC<TasksShareBlockProps> = ({ result }) => {
    const { t } = useTranslation();

    return (
        <Block>
            <ColumnLayout style={{ gap: '16px' }}>
                <p>{t('tasksShareBlockDescription')}</p>
                <ButtonShareTasks result={result} />
            </ColumnLayout>
        </Block>
    );
};
