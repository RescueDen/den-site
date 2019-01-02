//Store the info coming back from the server

import {ArticleItemData} from "./ArticlesSummary";

export interface DocumentItemData{

    //Store the info info
    id:string;
    name:string;
    type:string;
    preview?:string;
    date?:Date;
    thumbnail?:string;
    parentid:string;

    //See if we need to hide it
    hideListing?: boolean

    //And hold other items
    items?:DocumentItemData[]
}



/**
 * Define a class that uses the CAWS User data
 */
export default interface DocumentSummary{

    //Check to see if it empty
    findArticleItem(id:string): DocumentItemData;

    //Build breadCrumbs
    buildBreadcrumbs(id:string) :DocumentItemData[];



}

/**
 * Determines if the item being passed is in a directory
 */
export function isDirectory(item: DocumentItemData) {
    return item.type == "application/vnd.google-apps.folder";
}

/**
 * determines if the article or summary shows up in the list
 * @param item
 * @param searchTerm
 */
export function inSearchResults(item: DocumentItemData, searchTerm: string): boolean {
    //Set the search result
    let result = -1;

    //Now check each area
    result = Math.max(item.name.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    if (item.preview) {
        result = Math.max(item.preview.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    }

    return result >= 0;
}