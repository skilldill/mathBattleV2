import cn from 'classnames';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: 'primary' | 'success' | 'danger';
    variant?: 'solid' | 'outline' | 'clear';
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { disabled, children, color = 'primary', variant = 'solid', ...rest } = props;
    
    return (
        <button 
            className={cn(styles.button, styles[variant], styles[color], {
                [styles.disabled]: disabled
            })} 
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};
