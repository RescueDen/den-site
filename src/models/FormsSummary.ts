/**
 * Specifies the caws user data
 */
import DocumentSummary, {DocumentItemData} from "./DocumentSummary";

export interface FormMetaData {
    title:string;
    requiredPerm:string[];


}


//Store the info coming back from the server
export interface FormItemData extends DocumentItemData{

    //Store the form metadata
    metadata:FormMetaData;

    //And the meta data
    JSONSchema:any;
    UISchema:any;

}


/**
 * Define a class that uses the CAWS User data
 */
export default class FormsSummary implements DocumentSummary{
    //Set to read only for now
    public readonly data:FormItemData;

    //Build a flat list for fast look ups
    itemList: { [id: string]: DocumentItemData; } = {};

    //The main constructor
    constructor(data: FormItemData) {
        this.data = data;

        //Now add all of the items to the flat this
        this.addToList(this.data);
    }

    //Add to itemList
    private addToList(data: DocumentItemData){

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
    public buildBreadcrumbs(id:string) :DocumentItemData[]{
        //Build a list list
        let breadCrumbs: DocumentItemData[] = [];

        //If there is no id return
        if(id === undefined || this.empty())
            return breadCrumbs;

        //While the id is not null
        while(id.length > 0){
            //Get the article
            const breadCrumb: DocumentItemData = this.findArticleItem(id);

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
 * Function termines if this is a FormItemData
 * @param arg
 */
export function isFormItemData(arg: any): arg is FormItemData{
    return (arg.metadata != undefined) &&
        (arg.JSONSchema != undefined) &&
        (arg.UISchema != undefined);

}
