import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';

import { setupIonicReact } from '@ionic/react';
import './i18n';  // Initialize i18n


setupIonicReact({
  mode: 'ios'
});

const container = document.getElementById('root');
const root = createRoot(container!);
const selectedLanguage = localStorage.getItem('i18nextLng');
root.render(
  selectedLanguage ? <App /> : <LanguageSelectionScreen />
);