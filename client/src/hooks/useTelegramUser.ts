import { useEffect, useState } from 'react';
import { initData, User } from '@telegram-apps/sdk';

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
  const [user, setUser] = useState<User>();
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    const userData = initData.user();
    if (userData) {
      setUser(userData);
      setIsTelegram(true);
    }
  }, []);

  return { user, isTelegram };
};