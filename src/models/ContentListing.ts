import {ItemData} from "./ItemData";

export interface ListingData{
    id:string;
    name:string;
    date?:Date;
    parentId:string;

    //See if we need to hide it
    hideListing?: boolean;

    //And hold other items
    listings?:ListingData[];
    items?:ItemData[]
}

export class ContentListing implements Listing{
    //Set to read only for now
    public readonly data:ListingData;

    //Build a flat list for fast look ups
    itemList: { [id: string]: ItemData; } = {};
    subListing: {[id: string]: ListingData} = {};

    //The main constructor
    constructor(data: ListingData) {
        this.data = data;

        //Now add all of the items to the flat this
        this.addToList(this.data);
    }

    //Add to itemList
    private addToList(data: ListingData){
        this.subListing[data.id] = data;

        if(data.items)
            data.items.forEach(item => this.itemList[item.id] = item);

        //Now add each of the children
        if(data.listings)
            data.listings.forEach(listing => this.addToList(listing))
    }

    //Check to see if it empty
    public empty():boolean{
        return this.data.id.length == 0;
    }

    public find(id:string|undefined): ItemData|ListingData|undefined {
        if(id){
            return this.itemList[id] || this.subListing[id];
        }
    }

    public findItem(id:string|undefined):ItemData|undefined {
        if(id){
            return this.itemList[id];
        }
        return;
    }

    public findListing(id:string|undefined):ListingData|undefined {
        if(id){
            return this.subListing[id];
        }

        return;
    }

    //Build breadCrumbs
    public buildBreadcrumbs(id:string) :(ItemData|ListingData)[]{
        //Build a list list
        let breadCrumbs: ItemData|ListingData[] = [];

        //If there is no id return
        if(id === undefined || this.empty())
            return breadCrumbs;

        //While the id is not null
        while(id.length > 0){
            //Get the article
            const breadCrumb: ListingData|ItemData|undefined = this.find(id);

            if (breadCrumb){
                //Add it to the list
                breadCrumbs.push(breadCrumb);

                //Set the current parent
                id = breadCrumb.parentId;
            }
        }

        //Return
        return breadCrumbs.reverse();
    }
}

export interface Listing{

    findItem(id:string|undefined):ItemData|undefined;

    findListing(id:string|undefined):ListingData|undefined;

    //Build breadCrumbs
    buildBreadcrumbs(id:string) :(ItemData|ListingData)[];

    empty(): boolean;
}

/**
 * determines if the article or summary shows up in the list
 * @param item
 * @param searchTerm
 */
export function inSearchResults(item: ItemData, searchTerm: string): boolean {
    if (!searchTerm){
        return true;
    }

    //Set the search result
    let result = -1;

    //Now check each area
    result = Math.max(item.name.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    if (item.preview) {
        result = Math.max(item.preview.toLowerCase().indexOf(searchTerm.toLowerCase()), result);
    }

    return result >= 0;
}