import styles from './Block.module.css';
import { PropsWithChildren } from 'react';


export const Block: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.block}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
