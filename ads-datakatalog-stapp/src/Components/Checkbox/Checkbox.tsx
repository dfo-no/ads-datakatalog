import React from 'react';
import Style from './Checkbox.module.css';

export interface CheckboxProps {
    checked: boolean;
    children?: React.ReactNode;
    title?: string;
    onChange: (newValue: boolean) => void;
}

export const Checkbox = ({ children, checked, onChange, title }: CheckboxProps) => (
    <label className={Style['Checkbox']}>
        <input
            className={`${Style['Checkbox-box']}`}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.currentTarget.checked)}
        />{' '}
        <div className={Style['Checkbox-label']} title={title}>
            {children}
        </div>
    </label>
);
