
//Define the caws user, this comes from the json decode
export interface WikiPage{
    title?:string;
    content:string;
    revision?:number;
    lastChangeDate?:Date;
    lastChangeUser?:number;
}

