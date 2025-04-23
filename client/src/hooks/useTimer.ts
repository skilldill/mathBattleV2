import { useState } from "react";

export const useTimer = () => {
    const [startTime, setStartTime] = useState<number>(0);

    const startTimer = () => {
        const startTime = Date.now();
        setStartTime(startTime);
    }

    const getTime = () => {
        const endTime = Date.now();
        return endTime - startTime;
    }

    return { startTimer, getTime };
}