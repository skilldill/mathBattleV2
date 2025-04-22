import { useEffect, useState } from "react";

export function useTelegramUser() {
  const [user, setUser] = useState<any>(null);
  const [initData, setInitData] = useState<any>(null);
  const [startParam, setStartParam] = useState<any>(null);

  useEffect(() => {
    if ((window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      const data = tg.initDataUnsafe;

      setUser(data?.user || null);
      setInitData(data);
      setStartParam(data?.start_param || null);
    } else {
      console.warn("Telegram WebApp API не найдена.");
    }
  }, []);

  return { user, initData, startParam };
}
