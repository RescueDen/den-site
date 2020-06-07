import FormListing from "../models/FormListing";

export default interface FormsState {
    formsListing: { [category: string]: FormListing; }
}
