import {ContentListing} from "../models/ContentListing";

export default interface ContentState {
    contentListings: { [category: string]: ContentListing; }
}
