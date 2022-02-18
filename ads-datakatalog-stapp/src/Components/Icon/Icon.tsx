import React from 'react';
import Style from './Icon.module.css';

type AvailableIcons =
    | 'check'
    | 'eye'
    | 'rocket'
    | 'plus-circle'
    | 'pencil'
    | 'arrow-up'
    | 'arrow-right'
    | 'arrow-down'
    | 'arrow-left'
    | 'envelope'
    | 'trash'
    | 'cloud-check'
    | 'cloud-sync'
    | 'check-thick'
    | 'warning'
    | 'close'
    | 'menu'
    | 'cards'
    | 'close-filled'
    | 'search'
    | 'calendar'
    | 'list'
    | 'chevron-right'
    | 'chevron-left'
    | 'chevron-down'
    | 'chevron-up'
    | 'reading'
    | 'download'
    | 'share'
    | 'equalizer';

export interface IconProps {
    icon: AvailableIcons;
}

export const Icon = ({ icon }: IconProps) => <i className={`${Style['Icon']} icon-${icon}`} />;
