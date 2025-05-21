import { PropsWithChildren } from 'react';
import styles from './ColumnLayout.module.css';

type ColumnLayoutProps = {
    withPadding?: boolean;
    fluid?: boolean;
    style?: React.CSSProperties;
}
export const ColumnLayout: React.FC<PropsWithChildren<ColumnLayoutProps>> = ({ children, withPadding = false, fluid = false, style }) => {
  return (
    <div className={styles.columnLayout} style={{ padding: withPadding ? '20px' : '0px', width: fluid ? '100%' : 'auto', ...style }}>
      {children}
    </div>
  );
};
