export const formatDate = (d: Date): string => d.toLocaleDateString();

export const formatTime = (d: Date): string => d.toLocaleTimeString();

export const formatDateTime = (d: Date): string => formatDate(d) + ' ' + formatTime(d);
