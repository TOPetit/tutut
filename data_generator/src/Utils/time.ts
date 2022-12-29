/**
 * 
 * @param {Date} date the date to convert in string
 * @returns {string} a string version of the date: DD/MM/YYYY HH:MM:SS.MMM
 */
export function date_to_string(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formattedDate = date.toLocaleString('fr-FR', options);
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${formattedDate}.${milliseconds}`;
}
