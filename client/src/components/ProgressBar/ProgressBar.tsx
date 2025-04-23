import styles from './ProgressBar.module.css'

type ProgressBarProps = {
    progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBarIndicator} style={{ width: `${progress}%` }}></div>
        </div>
    )
}