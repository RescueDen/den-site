
import DocumentSummary, {DocumentItemData} from "./DocumentSummary";

//Store the info coming back from the server
export interface ArticleItemData extends DocumentItemData{

}

export default class ArticlesSummary implements DocumentSummary{
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
    public findArticleItem(id:string):ArticleItemData {
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

