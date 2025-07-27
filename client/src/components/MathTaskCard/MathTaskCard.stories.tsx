import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MathTaskCard } from './MathTaskCard';
import { MathTaskDto } from '../../types/MathTaskDto';

export default {
    title: 'MathTaskCard',
    component: MathTaskCard,
} as Meta;

const Template: StoryFn<{ task: MathTaskDto; onVariantClick: (variant: number) => void }> = (args: { task: MathTaskDto; onVariantClick: (variant: number) => void }) => <MathTaskCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    task: {
        taskArgs: [2, 2],
        taskActions: ['+'],
        result: 4,
        readableTask: '2 + 2',
        variants: [3, 4, 5, 6],
    },
    onVariantClick: (variant: number) => alert(`Variant clicked: ${variant}`),
}; 

export const WithCurrentNumber = Template.bind({});
WithCurrentNumber.args = {
    ...Default.args,
};