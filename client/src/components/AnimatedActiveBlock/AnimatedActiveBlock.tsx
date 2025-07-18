import { FC, PropsWithChildren } from "react";
import styles from './AnimatedActiveBlock.module.css';
import cn from 'classnames';

type AnimatedActiveBlockProps = {
    isActive: boolean;
    className?: string;
}

export const AnimatedActiveBlock: FC<PropsWithChildren<AnimatedActiveBlockProps>> = ({ children, isActive = false, className = '' }) => {
    return (
        <div className={cn(styles.animatedActiveBlock, className, {
            [styles.active]: isActive,
        })}>
            {children}
        </div>
    );
};