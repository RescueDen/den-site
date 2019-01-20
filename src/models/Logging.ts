/**
 * Specify Log Info
 */


export interface LogData{

    readonly id:number;
    readonly type:number;
    readonly value:number
    readonly category:string
    readonly date:Date
    readonly comments:string

}


export interface   MonthInfo {
    month : number
    year:number
    total :number
}

/**
 Define an interface that all Calc Repos must follow
 */
export interface  LogSummary {

    //Get Logging Type Table
    recentLogs: { [category: string]: LogData[]; }


    //Store the year summary
    historySummary: { [category: string]: MonthInfo[]; }

    //Get the summary for that info
    total: { [category: string]: number; }

}




/**
 * Specify Log Info
 */
export interface  TypeInfo{
    readonly id:number
    readonly name:string
    readonly description:string

}

/**
 * Specify Log Info
 */
export interface  CategoryInfo{
    readonly types:{ [type: string]: TypeInfo; }
    readonly name:string
    readonly unit:string
    readonly maximum?:number
    readonly description: string

}

/**
 Store the type information
 */
export interface  CategoryInfoSummary {

    //Get Logging Type Table
    categories: { [category: string]: CategoryInfo; }

}



