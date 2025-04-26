import React from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';
import { Button } from '../../components/Button/Button';
import { useTasksStore } from '../../store/tasksStore';
import { useHistory } from 'react-router-dom';

export const SettingsDailyRatingsScreen: React.FC = () => {
    const { setCreateParams } = useTasksStore();
    const history = useHistory();

    const handleStart = () => {
        setCreateParams(20, 'combo');
        history.push('/puzzles-rating');
    }

    return (
        <ColumnLayout style={{ height: '100%' }}>
            <div>
                <h1>🏆 Рейтинговая игра</h1>
                <p>Готов проверить свои силы?</p>

                <p><strong>Твоя цель:</strong> решай примеры <strong>как можно быстрее</strong>, но не забывай про <strong>точность</strong>!</p>

                <div className="rules">
                    <h3>Правила игры:</h3>
                    <ul>
                        {/* <li>Играть можно <strong>раз в день</strong>.</li> */}
                        <li>Тебя ждёт 20 примеров с разной сложностью.</li>
                        <li>Время решения и количество верных ответов влияют на твое место в рейтинге.</li>
                    </ul>
                </div>

                <p>⚡️ Будь точным, будь быстрым — завоюй вершину таблицы лидеров!</p>
                <p>💡 Ты можешь потренироваться в решении примеров в разделе "Проверить себя" 👈</p>
            </div>
            <Button onClick={handleStart}>
                🏆 На вершину рейтинга!
            </Button>
        </ColumnLayout>
    );
}; 