/**
 * Specify event information
 */
import {ItemData} from "./ItemData";

export interface EventData{

    readonly date?:Date;
    readonly id:string;
    readonly infoId?:string;
    readonly signupId?:string;
    readonly name:string


}

export default class EventsSummary{
    //Set to read only for now
    public readonly data:ItemData;

    //Build a flat list for fast look ups
    eventList: { [id: string]: EventData; } = {};

    //Build a list of different event types
    eventGroups: { [name: string]: EventData[]; } = {};

    //Build a list of different event types
    lookUpGroup: { [id: string]: string; } = {};



    //The main constructor
    constructor(data: ItemData) {
        this.data = data;

        // //March over each folder in the
        // this.data.items && this.data.items.filter(item =>{
        //     //Make sure that it is a folder
        //     return item.type == "application/vnd.google-apps.folder"
        // }).forEach(folder =>{
        //     //Build a list of events for this folder
        //     this.eventGroups[folder.name] = this.buildEvents(folder)
        //
        //     //Sort the folder by dates
        //     this.eventGroups[folder.name].sort((a:EventData, b:EventData) => {
        //         if(a.date && b.date){
        //             if(a.date < b.date)
        //                 return -1;
        //             else if(a.date > b.date)
        //                 return 1;
        //             else
        //                 return 0
        //         }
        //         //Put the non dates at the end
        //         if(a.date && !b.date)
        //             return 1
        //         if(!a.date && b.date)
        //             return -1
        //         return 0
        //     });
        //
        //
        //     //Now put each event into the list
        //     this.eventGroups[folder.name].forEach(event => {
        //         this.eventList[event.id] = event;
        //         this.lookUpGroup[event.id] = folder.name;
        //
        //     });
        //
        //
        //
        //
        // })

    }
    /**
    *Private method to build a list of events in order
    */
    private buildEvents(folder:ItemData): EventData[] {
        // //Create an empty array
        let events:EventData[] = []
        //
        // //March over each
        // if (folder.items){
        //     events = folder.items.map(item =>{
        //         return <EventData> item;
        //     })
        // }
        //
        //
        return events;
    }

    //Add to itemList
    // private addToList(data: DocumentItemData){
    //
    //     //Add the current item
    //     this.itemList[data.id] = data;
    //
    //     //Now add each of the children
    //     if(data.items)
    //         data.items.forEach(item => this.addToList(item));
    //
    // }

    //Check to see if it empty
    public empty():boolean{
        return this.data.id.length == 0;
    }


}
