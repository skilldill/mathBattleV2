import React from 'react';
import { Block } from '../../components/Glass/Block';
import { ColumnLayout } from '../../components/ColumnLayout/ColumnLayout';
import { useTranslation } from 'react-i18next';

export const RatingsScreen: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Block>
            <ColumnLayout style={{ gap: '10px' }}>
                <h1>{t('topMathematiciansRatingTitle')}</h1>
                <p>{t('topMathematiciansRatingContent')}</p>
            </ColumnLayout>
        </Block>
    );
}; 