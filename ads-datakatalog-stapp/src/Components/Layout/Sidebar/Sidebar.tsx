import React from 'react';
import Style from './Sidebar.module.css';

export interface SidebarProps {
    children?: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => <aside className={Style['Sidebar']}>{children}</aside>;
