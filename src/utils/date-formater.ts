/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function yearMonthDay(dateIn:string) {
    //Create a date object
    const date = ((new Date(dateIn)));
    return date.getFullYear() + "/" + date.getMonth() + "/"+date.getDay();
}

/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function formatDate(dateIn:any) {
    return yearMonthDay(dateIn.toString());
}