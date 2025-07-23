import React, { useEffect, useState } from 'react';
import styles from './CountdownScreen.module.css';

interface CountdownScreenProps {
  seconds: number;
  onFinish?: () => void;
  children: React.ReactNode;
  title?: string;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({ seconds, onFinish, children, title }) => {
  const [currentSecond, setCurrentSecond] = useState<number>(seconds);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond((prevSecond) => {
        if (prevSecond <= 1) {
          clearInterval(interval);
          setIsFinished(true);
          onFinish?.();
          return 0;
        }
        return prevSecond - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish]);

  if (isFinished) {
    return <>{children}</>;
  }

  return (
    <div className={styles.countdownScreen}>
      <h1 className={styles.title}>{title}</h1>
      <h1 className={styles.countdown}>{currentSecond}</h1>
    </div>
  );
};