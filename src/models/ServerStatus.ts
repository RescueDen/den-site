import {error} from "../actions/alert.actions";
import {userConstants} from "../actions/user.actions";

export class ServerResponseStatus{
    readonly status:boolean;
    readonly message:string;

    constructor(status:boolean, message:string){
        this.status = status;
        this.message = message;
    }

}


/**
 * Simple function to get the message from a response error
 * @param response
 */
export function extractMessageFromPossibleServerResponseStatus(response:any):string{
    //Wrap in
    try {
        //Convert the status back
        const status = <ServerResponseStatus>response.response.data;

        //See if it is undefined
        if (status == undefined)
            return response.toString();
        else
            return status.message;
    }catch(e){
        return response.toString();
    }


}