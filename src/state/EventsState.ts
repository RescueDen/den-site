
import EventsSummary from "../models/Events";

/**
 * This model describes the current
 */
export default interface EventsState {
    eventsSummary: EventsSummary
    //Set the type of view
    //show the display preferences
    hideCal:{[id: string]: boolean}

}

/*
export enum EventView{
    Cal = "CalView",
    List = "ListView"
}
*/