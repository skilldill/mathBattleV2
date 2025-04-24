import { useEffect } from "react";
import { useUserStore } from "../store/userStore";


export const useTgUserInfo = () => {
    const { setUserData } = useUserStore()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('u91x');
        const userName = params.get('x_3z9');
        
        if (userId && userName) {
            setUserData(userName, userId);
        }
    }, []);
}
