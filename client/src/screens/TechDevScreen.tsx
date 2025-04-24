import { ScreenLayout } from '../components';
import { useTelegramUser } from '../hooks/useTelegramUser';


export const TechDevScreen: React.FC = () => {
    const { user } = useTelegramUser();
    return (
        <ScreenLayout>
            <h1>TechDevScreen</h1>
            <code>
                {JSON.stringify(user, null, 2)}
            </code>
        </ScreenLayout>
    );
};