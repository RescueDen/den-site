export interface ItemData{
    //Store the info info
    id:string;
    name:string;
    type:string;
    preview?:string;
    date?:Date;
    thumbnail?:string;
    parentId:string;

    //See if we need to hide it
    hideListing?: boolean
}