import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Button.module.css';
import { IconProps } from '../Icon/Icon';

interface ButtonProps {
    icon?: React.ReactElement<IconProps>;
    to?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode;
}

export const Button = ({ to = '', onClick, children, icon }: ButtonProps) => {
    if (to?.startsWith('https://')) {
        return (
            <a className={Style.Button} href={to} target="_blank" rel="noopener noreferrer">
                {children}
                {icon}
            </a>
        );
    }
    if (to) {
        return (
            <Link className={Style.Button} to={to}>
                {children}
                {icon}
            </Link>
        );
    }
    return (
        <button className={Style.Button} onClick={onClick}>
            <div>{children}</div>
            {icon}
        </button>
    );
};
