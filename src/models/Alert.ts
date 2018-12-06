export class Alert {

    //The Message simType
    readonly message:string;

    //Set the id
    readonly _id?:number;

    //Store the alert simType
    readonly type:AlertType;



    //The main public constructor
    constructor(type:AlertType, message:string, id?:number) {
        this._id = id;
        this.type = type;
        this.message = message
    }



    //The main public constructor
    assignId(id:number) :Alert {
        //Create a new child with an id
        const alert =  new Alert(this.type, this.message, id);

        return alert;
    }

    /**
     * Type script getter and set
     */
    get id(): number | undefined {
        return this._id;
    }


}

/**
 * Define an enum for different simType of alerts
 */
export enum AlertType {
    POSITIVE = "positive",
    NEGATIVE = "negative",

}