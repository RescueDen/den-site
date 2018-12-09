/**
 * Specifies the caws user data
 */
import {formatDate} from "../utils/date-formater";
import CawsAnimal from "./CawsAnimal";

//Store the info coming back from the server
export interface ArticleItemData{

    //Store the info info
    id:string;
    name:string;
    type:string;
    preview?:string;
    date?:Date;
    thumbnail?:string;
    parentid:string;

    //And hold other items
    items?:ArticleItemData[]
}


/**
 * Define a class that uses the CAWS User data
 */
export default class ArticlesSummary{
    //Set to read only for now
    public readonly data:ArticleItemData;

    //Build a flat list for fast look ups
    itemList: { [id: string]: ArticleItemData; } = {};

    //The main constructor
    constructor(data: ArticleItemData) {
        this.data = data;

        //Now add all of the items to the flat this
        this.addToList(this.data);
    }

    //Add to itemList
    private addToList(data: ArticleItemData){

        //Add the current item
        this.itemList[data.id] = data;

        //Now add each of the children
        if(data.items)
            data.items.forEach(item => this.addToList(item));

    }

    //Check to see if it empty
    public empty():boolean{
        return this.data.id.length == 0;
    }

    //Check to see if it empty
    public findArticleItem(id:string){
        return this.itemList[id];
    }

    //Build breadCrumbs
    public buildBreadcrumbs(id:string) :ArticleItemData[]{
        //Build a list list
        let breadCrumbs: ArticleItemData[] = [];

        //If there is no id return
        if(id === undefined || this.empty())
            return breadCrumbs;

        //While the id is not null
        while(id.length > 0){
            //Get the article
            const breadCrumb: ArticleItemData = this.findArticleItem(id);

            //Add it to the list
            breadCrumbs.push(breadCrumb);

            //Set the current parent
            id = breadCrumb.parentid;
        }


        //Return
        return breadCrumbs.reverse();
    }



}

/**
 * Determines if the item being passed is in a directory
 */
export function isDirectory(item: ArticleItemData) {
    return item.type =="application/vnd.google-apps.folder";
}

/**
 * determines if the article or summary shows up in the list
 * @param item
 * @param searchTerm
 */
export function inSearchResults(item: ArticleItemData, searchTerm: string): boolean {
    //Set the search result
    let result = -1;

    //Now check each area
    result = Math.max(item.name.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    if(item.preview) {
        result = Math.max(item.preview.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    }

    return  result>= 0;
}
