
import {ItemData} from "./ItemData";
import {Listing, ListingData} from "./ContentListing";
import {LessonData} from "./Courses";

export interface FormListingData extends ListingData{
    items?:FormItemData[]
    listings?:FormListingData[]
}

export interface FormItemData extends ItemData{
    //Store the form metadata
    metadata:FormMetaData;

    //And the meta data
    JSONSchema:any;
    UISchema:any;
}

export interface FormMetaData {
    title:string;
    requiredPerm:string[];
}

export default class FormListing{
    //Set to read only for now
    public readonly data:FormListingData;

    //Build a flat list for fast look ups
    itemList: { [id: string]: FormItemData; } = {};
    subListing: {[id: string]: FormListingData} = {};

    //The main constructor
    constructor(data: FormListingData) {
        this.data = data;

        //Now add all of the items to the flat this
        this.addToList(this.data);
    }

    private addToList(data: FormListingData){
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

    public find(id:string|undefined): FormItemData|FormListingData|undefined {
        if(id){
            return this.itemList[id] || this.subListing[id];
        }
    }

    public findItem(id:string|undefined):FormItemData|undefined {
        if(id){
            return this.itemList[id];
        }
        return;
    }

    public findListing(id:string|undefined):FormListingData|undefined {
        if(id){
            return this.subListing[id];
        }
        return;
    }

    public buildBreadcrumbs(id:string) :(FormItemData|FormListingData)[]{
        //Build a list list
        let breadCrumbs: FormItemData|FormListingData[] = [];

        //If there is no id return
        if(id === undefined || this.empty())
            return breadCrumbs;

        //While the id is not null
        while(id.length > 0){
            //Get the article
            const breadCrumb: FormListingData|FormItemData|undefined = this.find(id);

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

/**
 * Function termines if this is a FormItemData
 * @param arg
 */
export function isFormItemData(arg: any): arg is FormItemData{
    return (arg.metadata != undefined) &&
        (arg.JSONSchema != undefined) &&
        (arg.UISchema != undefined);

}
