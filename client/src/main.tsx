import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { setupIonicReact } from '@ionic/react';
import { init, miniApp } from '@telegram-apps/sdk';


const initializeTelegramSDK = async () => {
  try {
    await init();


    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      console.log('Mini App готово');
    }


  } catch (error) {
    console.error('Ошибка инициализации:', error);
  }
};


initializeTelegramSDK();


setupIonicReact({
  mode: 'ios'
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <App />
);