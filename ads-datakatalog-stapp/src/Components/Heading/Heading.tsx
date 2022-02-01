import React from 'react';
import Style from './Heading.module.css';

export enum HeadingLevel {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
}

interface HeadingProps {
    level: HeadingLevel;
    children: React.ReactNode;
}

export const Heading = ({ level, children }: HeadingProps) => {
    switch (level) {
        case HeadingLevel.h1:
            return <h1 className={Style['h1']}>{children}</h1>;
        case HeadingLevel.h2:
            return <h2 className={Style['h2']}>{children}</h2>;
        case HeadingLevel.h3:
            return <h3 className={Style['h3']}>{children}</h3>;
        case HeadingLevel.h4:
            return <h4 className={Style['h4']}>{children}</h4>;
        case HeadingLevel.h5:
            return <h5 className={Style['h5']}>{children}</h5>;
        case HeadingLevel.h6:
            return <h6 className={Style['h6']}>{children}</h6>;
    }
};
