import {EventData} from "../models/Events";

/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function yearMonthDay(dateIn:string) {
    //Create a date object
    const date = ((new Date(dateIn)));
    //If it is in the past return empty
    if(date.valueOf() < 0){
        return ""
    }

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



/**
 * Formats the date in a year month day format
 * @param dateIn
 */
export function sortDates(dates:string[]) {
    dates.sort((a:string, b:string) => {
        //Convert to date
        const aDate = new Date(a);
        const bDate = new Date(b);

        if(aDate.valueOf()>0 && bDate.valueOf()>0){
            if(aDate < bDate)
                return -1;
            else if(aDate > bDate)
                return 1;
            else
                return 0
        }
        //Put the non dates at the end
        if(aDate.valueOf() >0 && bDate.valueOf() <0)
            return 1
        if(aDate.valueOf() >0 && bDate.valueOf()<0)
            return -1
        return 0
    });




}
