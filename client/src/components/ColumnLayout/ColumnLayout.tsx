import { PropsWithChildren } from 'react';
import styles from './ColumnLayout.module.css';

type ColumnLayoutProps = {
    withPadding?: boolean;
}
export const ColumnLayout: React.FC<PropsWithChildren<ColumnLayoutProps>> = ({ children, withPadding = false }) => {
  return (
    <div className={styles.columnLayout} style={{ padding: withPadding ? '20px' : '0px' }}>
      {children}
    </div>
  );
};
