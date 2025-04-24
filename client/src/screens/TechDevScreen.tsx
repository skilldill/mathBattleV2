import { useLaunchParams } from '@telegram-apps/sdk-react';
import { ScreenLayout } from '../components';


export const TechDevScreen: React.FC = () => {
    const tgData = useLaunchParams();

    return (
        <ScreenLayout>
            <h1>TechDevScreen</h1>
            <code>
                {JSON.stringify(tgData, null, 2)}
            </code>
        </ScreenLayout>
    );
};