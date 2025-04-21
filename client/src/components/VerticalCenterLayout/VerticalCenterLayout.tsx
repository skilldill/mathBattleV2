import { PropsWithChildren } from "react";
import styles from './VerticalCenterLayout.module.css';

export const VerticalCenterLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.verticalCenterLayout}>
      {children}
    </div>
  );
};