import { ScreenLayout } from "../../components";
import { useParams } from "react-router";

export const PuzzlesResultScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <ScreenLayout>
            <h1>Результаты</h1>
            <h2>{id}</h2>
        </ScreenLayout>
    );
};