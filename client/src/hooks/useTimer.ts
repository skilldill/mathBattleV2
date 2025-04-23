import { useState } from "react";

export const useTimer = () => {
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);

    const startTimer = () => {
        setStartTime(Date.now());
    }

    const stopTimer = () => {
        setEndTime(Date.now());
    }

    const getTime = () => {
        return endTime - startTime;
    }

    return { startTimer, stopTimer, getTime };
}