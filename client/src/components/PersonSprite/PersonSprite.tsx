import styles from './PersonSprite.module.css';
import cn from 'classnames';

type PersonSpriteProps = {
  emotion: string; // 'normal' | 'nervous' | 'veryNervous' | 'happy' | 'sad';
  person: string; // 'boy' | 'girl' | 'professor';
}

export const PersonSprite = ({ emotion, person }: PersonSpriteProps) => {
  return (
    <div className={cn(styles.person, styles[`${person}_${emotion}`])} />
  );
};
