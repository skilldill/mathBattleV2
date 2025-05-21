import cn from 'classnames';
import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: 'primary' | 'success' | 'danger';
    variant?: 'solid' | 'outline' | 'clear';
    size?: 'small' | 'medium';
    fluid?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { disabled, children, color = 'primary', variant = 'solid', size = 'medium', fluid = false, ...rest } = props;
    
    return (
        <button 
            className={cn(styles.button, styles[variant], styles[color], styles[size], {
                [styles.disabled]: disabled,
                [styles.fluid]: fluid
            })} 
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};
