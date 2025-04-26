import React from 'react';
import { ColumnLayout, ScreenLayout } from '../../components';
import { IonImg } from '@ionic/react';
import MathBattleCoverPng from '../../assets/MathBattleCover.png';
export const AboutScreen: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <h1>О проекте</h1>
      <IonImg src={MathBattleCoverPng} />
      <p>🎯 <strong>MathBattle — это больше, чем просто математика!</strong><br/>
        Это поле битвы умов, арена для тех, кто мыслит быстро и точно 💡💥</p>

      <p>🚀 <strong>Почему это круто?</strong></p>
      <ul>
        <li>🧠 Мозг кипит — тренируешься и растешь</li>
        <li>⏱️ Адреналин — все на скорости</li>
        <li>🏆 Турниры, рейтинги, призы — будь на вершине!</li>
        <li>🤝 Комьюнити единомышленников — свои в доску</li>
      </ul>

      <p>👨‍💻 Для школьников, студентов, олимпиадников, преподавателей и просто всех, кто любит математику — здесь тебе всегда рады!</p>

      <p>🔥 Включайся, заряжай мозг и покажи, на что ты способен!<br/>
        Это <strong>MathBattle</strong> — и здесь побеждают умом!</p>
    </div>
  );
};
