import React, { useEffect, useState } from 'react';

interface CountdownScreenProps {
  seconds: number;
  onFinish: () => void;
  children: React.ReactNode;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({ seconds, onFinish, children }) => {
  const [currentSecond, setCurrentSecond] = useState<number>(seconds);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond((prevSecond) => {
        if (prevSecond <= 1) {
          clearInterval(interval);
          setIsFinished(true);
          onFinish();
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
    <div style={{ fontSize: '48px', textAlign: 'center' }}>
      {currentSecond}
    </div>
  );
};