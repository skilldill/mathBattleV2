import { useEffect, useRef } from 'react';
import styles from './LinearTimer.module.css';

type LinearTimerProps = {
    seconds: number;
    onFinish: () => void;
    onTick?: (currentSecond: number, percentageElapsed: number) => void;
}

/**
 * Главное не передавать сюда функцию
 * которая содержит динамические параметрыъ
 * иначе из-за React они не будут обновляться
 */
export const LinearTimer = ({ seconds, onFinish, onTick }: LinearTimerProps) => {
  useEffect(() => {
    let currentSecond = seconds;
    const interval = setInterval(() => {
      currentSecond -= 1;
      const percentageElapsed = ((seconds - currentSecond) / seconds) * 100;
      if (onTick) onTick(currentSecond, percentageElapsed);
      if (currentSecond <= 0) {
        clearInterval(interval);
        onFinish();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.linearTimer}>
        <div className={styles.linearTimerIndicator} style={{ animationDuration: `${seconds}s` }}></div>
    </div>
  );
};
