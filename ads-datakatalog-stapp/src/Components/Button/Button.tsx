import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Button.module.css';

interface ButtonProps {
    to?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children: React.ReactNode;
}

export const Button = ({ to, onClick, children }: ButtonProps) => {
    if (to?.startsWith('https://')) {
        return (
            <a className={Style.Button} href={to} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
    if (to) {
        return (
            <Link className={Style.Button} to={to}>
                {children}
            </Link>
        );
    }
    return (
        <button className={Style.Button} onClick={onClick}>
            {children}
        </button>
    );
};
