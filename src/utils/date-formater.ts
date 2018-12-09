/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function yearMonthDay(dateIn:string) {
    //Create a date object
    const date = ((new Date(dateIn)));
    return date.getFullYear() + "/" + (date.getMonth()+1) + "/"+(date.getDay()+1);
}

/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function formatDate(dateIn:any) {
    //If the date is empty
    const dateString = dateIn.toString();
    if(dateString.length == 0)
        return ""

    return yearMonthDay(dateString);
}