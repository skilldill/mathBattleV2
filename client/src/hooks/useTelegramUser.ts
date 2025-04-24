import { useEffect, useState } from 'react';
import { User, retrieveLaunchParams } from '@telegram-apps/sdk';

// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }

export const useTelegramUser = () => {
  const [user, setUser] = useState<any>();
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const { tgWebAppData } = retrieveLaunchParams();
    console.log('tgWebAppData', tgWebAppData);
    if (tgWebAppData) {
      setUser(tgWebAppData);
      setIsTelegram(true);
    } else {
      setUser({ status: 'ТГ данных нет' });
      setIsTelegram(false);
    }
  }, []);

  return { user, isTelegram };
};