/**
 * Store the Stat Info
 */
export interface Stats {
    readonly asm: any;
}

/**
 * Store the adoption stats
 */
export interface AdoptionStat {
    code: string;
    id: number;
    name: string;
    date: Date;
    //Add in the thumbnail url
    thumbnailUrl: string;
}

