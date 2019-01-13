import {DocumentItemData} from "./DocumentSummary";

/**
 * Specify event information
 */
export interface FeedItemData{

    readonly id:string;
    readonly name?:string;
    readonly preview?:string
    readonly thumbnailurl:string
    readonly imgurl:string
    readonly date:Date
    readonly linkurl?:string
    readonly source:string

}

