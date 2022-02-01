import React from 'react';
import Style from './Checkbox.module.css';

export interface CheckboxProps {
    checked: boolean;
    children?: React.ReactNode;
    onChange: (newValue: boolean) => void;
}

export const Checkbox = ({ children, checked, onChange }: CheckboxProps) => (
    <label className={Style['Checkbox']}>
        <input
            className={Style['Checkbox-box']}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.currentTarget.checked)}
        />{' '}
        <div className={Style['Checkbox-label']}>{children}</div>
    </label>
);
