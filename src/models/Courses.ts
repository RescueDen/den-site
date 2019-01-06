/**
 * Specifies the caws user data
 */
import {formatDate} from "../utils/date-formater";
import {DocumentItemData} from "./DocumentSummary";

//Define the caws user, this comes from the json decode
export interface CourseData{
    id:string;
    name:string;
    preview:string;
    thumbnail:string;
    lessons:LessonData[]

}
//The animal media structure
export interface LessonData {
    name:number;
    infoId?:string;
    videoId?:string;
    formId?:string;
    embeddedUrl?:string;

}

/**
 * Define a class that uses the CAWS User data
 */
export default class CourseListing {
    //Set to read only for now
    public readonly list: CourseData[];


    //The main constructor
    constructor(list: CourseData[]) {
        this.list = list;
    }


    public getCourse(id:string): CourseData|undefined{
        for(let l =0; l < this.list.length; l++){
            if(this.list[l].id === id){
                return this.list[l];
            }
        }
        return undefined
    }

    public empty() :boolean{
        return this.list.length == 0;
    }



}

