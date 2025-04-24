import { useLaunchParams, useRawInitData } from '@telegram-apps/sdk-react';
import { ScreenLayout } from '../components';


export const TechDevScreen: React.FC = () => {
    const tgData = useLaunchParams();
    const rawInitData = useRawInitData();

    return (
        <ScreenLayout>
            <h1>TechDevScreen</h1>
            <code>
                {JSON.stringify(tgData, null, 2)}
                <br />
                <br />
                {rawInitData}
            </code>
        </ScreenLayout>
    );
};