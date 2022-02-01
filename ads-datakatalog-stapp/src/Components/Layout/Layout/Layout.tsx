import React from 'react';
import { MainAreaProps } from '../MainArea/MainArea';
import { SidebarProps } from '../Sidebar/Sidebar';
import Style from './Layout.module.css';

export enum LayoutTypes {
    Sidebar = 'Layout-sidebar'
}

interface LayoutProps {
    type: LayoutTypes;
    children: React.ReactElement<SidebarProps>[] | React.ReactElement<SidebarProps> | React.ReactElement<MainAreaProps>;
}

export const Layout = ({ children }: LayoutProps) => <div className={Style['Layout']}>{children}</div>;
