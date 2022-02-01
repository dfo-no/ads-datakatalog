import React from 'react';
import { CheckboxProps } from '../Checkbox/Checkbox';
import Style from './CheckboxGroup.module.css';

interface CheckboxGroupProps {
    children: React.ReactElement<CheckboxProps>[];
    title: string;
}

export const CheckboxGroup = ({ children, title }: CheckboxGroupProps) => (
    <fieldset className={Style['CheckboxGroup']}>
        <legend className={Style['CheckboxGroup-title']}>{title}</legend>
        <ul className={Style['CheckboxGroup-items']}>
            {children.map((item) => (
                <li>{item}</li>
            ))}
        </ul>
    </fieldset>
);
