import { useEffect, useRef } from 'react';
import styles from './LinearTimer.module.css';

type LinearTimerProps = {
    seconds: number;
    onFinish: () => void;
}

/**
 * Главное не передавать сюда функцию
 * которая содержит динамические параметрыъ
 * иначе из-за React они не будут обновляться
 */
export const LinearTimer = ({ seconds, onFinish }: LinearTimerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, seconds * 1000)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.linearTimer}>
        <div className={styles.linearTimerIndicator} style={{ animationDuration: `${seconds}s` }}></div>
    </div>
  );
};
