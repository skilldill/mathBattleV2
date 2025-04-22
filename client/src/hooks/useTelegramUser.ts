import { useEffect, useState } from "react";

export const useTelegramUser = () => {
    const [user, setUser] = useState<any>(null);
    const [initData, setInitData] = useState<any>(null);
    const [startParam, setStartParam] = useState<any>(null);
    
    useEffect(() => {
        if (typeof (window as any).Telegram !== 'undefined') {
            const tg = (window as any).Telegram.WebApp;
            setUser(tg.initDataUnsafe.user);
            setInitData(tg.initDataUnsafe);
            setStartParam(tg.initDataUnsafe.start_param);
        }
    }, []);

    return { user, initData, startParam };
};