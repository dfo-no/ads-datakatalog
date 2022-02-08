import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Shortcut.module.css';

interface ShortcutProps {
    url: string;
    title: string;
    icon?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Shortcut = ({ url, title, icon = 'equalizer', variant = 'primary' }: ShortcutProps) =>
    url.startsWith('http') ? (
        <a className={`${Style['Shortcut']} ${Style[`Shortcut_${variant}`]}`} href={url}>
            <div className={Style['Shortcut-icon']}>
                <i className={`icon-${icon}`} />
            </div>
            <div className={Style['Shortcut-title']}>
                <div>{title}</div>
                <div>
                    <i className={'icon-arrow-right'} />
                </div>
            </div>
        </a>
    ) : (
        <Link className={`${Style['Shortcut']} ${Style[`Shortcut_${variant}`]}`} to={url}>
            <div className={Style['Shortcut-icon']}>
                <i className={`icon-${icon}`} />
            </div>
            <div className={Style['Shortcut-title']}>
                <div>{title}</div>
                <div>
                    <i className={'icon-arrow-right'} />
                </div>
            </div>
        </Link>
    );
