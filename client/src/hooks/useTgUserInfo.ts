import { useEffect, useState } from "react";

type UserInfo = {
    userId: string;
    userName: string;
}

export const useTgUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('u91x');
        const userName = params.get('x_3z9');
        setUserInfo({ userId: userId ?? '', userName: userName ?? '' });
    }, []);

    return { userInfo }
}
