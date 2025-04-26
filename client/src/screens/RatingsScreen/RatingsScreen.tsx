import React from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';

export const RatingsScreen: React.FC = () => {
    return (
        <Block>
            <ColumnLayout style={{ gap: '10px' }}>
                <h1>Топ математиков 👩‍🎓</h1>
                <p>Скоро здесь будет таблица лидеров...</p>
            </ColumnLayout>
        </Block>
    );
}; 