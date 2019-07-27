
/**
 * Store the Stat Info
 */
export interface Stats{

    readonly asm:any;



}



/**
 * Store the adoption stats
 */

export interface AdoptionStat {
    SHELTERCODE:string;
    ID:number;
    NAME:string;
    Date:Date;
    //Add in the thumbnail url
    THUMBNAILURL: string;
}

