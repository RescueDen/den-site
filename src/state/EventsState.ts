import EventsListing from "../models/Events";

export default interface EventsState {
    eventsSummary: { [category: string]: EventsListing; }
    //Set the type of view
    //show the display preferences
    hideCal:{[id: string]: boolean}

}
