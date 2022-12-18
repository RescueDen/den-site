import data from "../assets/alerts"

export class Alert {

    //The Message simType
    readonly message: string;

    //Set the id
    readonly _id?: number;

    //Store the alert simType
    readonly type: AlertType;

    //Store the number of counts
    private count: number = 1;


    //The main public constructor
    constructor(type: AlertType, message: string, id?: number) {
        this._id = id;
        this.type = type;
        this.message = message
    }

    //Increase count
    bumpCount() {
        this.count++;
    }

    //Increase count
    getCount() {
        return this.count
    }

    //Increase count
    equals(otherAlert: Alert): boolean {
        return this.message === otherAlert.message;
    }

    //The main public constructor
    assignId(id: number): Alert {
        //Create a new child with an id
        return new Alert(this.type, this.message, id);
    }

    /**
     * Type script getter and set
     */
    get id(): number | undefined {
        return this._id;
    }

    /**
     * Get message
     */
    getMessage(): any {
        if (data[this.message]) {
            return data[this.message].message
        } else {
            return this.message
        }
    }

    /**
     * Get Header
     */
    getHeader(): string | undefined {
        if (data[this.message]) {
            return data[this.message].header
        } else {
            return undefined
        }
    }


}

/**
 * Define an enum for different simType of alerts
 */
export enum AlertType {
    POSITIVE = "positive", NEGATIVE = "negative",

}