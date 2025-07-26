import { PersonSprite } from "../PersonSprite/PersonSprite";
import styles from './PersonsAvatar.module.css';
import cn from 'classnames';

interface PersonsAvatarProps {
    person: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

export const PersonsAvatar = ({ person, disabled, selected, onClick }: PersonsAvatarProps) => {
    const handleClick = () => {
        if (disabled) return;
        onClick?.();
    }

    return (
        <div
            className={cn(styles.personAvatar, {
                [styles.personAvatarDisabled]: disabled,
                [styles.personAvatarItemSelected]: selected,
            })}
            onClick={handleClick}
        >
            <PersonSprite person={person} emotion="normal" />
            {disabled && (
                <div className={styles.personAvatarOverlay}>
                    <h1>?</h1>
                </div>
            )}
        </div>
    )
}