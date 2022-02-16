import React from 'react';

interface DateViewProps {
    date: number | Date | string | undefined;
    noDateString: string;
}

export const DateView = ({ date, noDateString = '-' }: DateViewProps) => (
    <>{date ? (date instanceof Date ? date : new Date(date)).toDateString() : noDateString} </>
);
