import cn from 'classnames';
import styles from './TasksCarousel.module.css';

type TasksCarouselProps = {
    items: any[];
    currentIndex: number;
    renderItem: (item: any) => React.ReactNode;
}

export const TasksCarousel: React.FC<TasksCarouselProps> = ({ items, currentIndex, renderItem }) => {
  return (
    <div className={styles.carouselWrap}>
        <div className={styles.carousel} style={{ transform: `translateX(calc(-${(currentIndex * 100)}% - ${currentIndex * 20}px))`}}>
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className={cn(styles.carouselItem, {
                        [styles.prevItem]: currentIndex < index,
                        [styles.nextItem]: currentIndex > index,
                    })} 
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    </div>
  );
};
