import React from 'react';
import SchoolboySpritePNG from '../../assets/student_emotions.png';
import styles from './Schoolboy.module.css';
import cn from 'classnames';

type SchoolboyProps = {
  emotion: string; //'normal' | 'nervous' | 'veryNervous';
}

export const Schoolboy = ({ emotion }: SchoolboyProps) => {
  return (
    <div className={cn(styles.schoolboy, styles[emotion as string])} />
  );
};
