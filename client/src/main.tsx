import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { setupIonicReact } from '@ionic/react';

import { init } from '@telegram-apps/sdk-react';

init();

setupIonicReact({
  mode: 'ios'
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <App />
);