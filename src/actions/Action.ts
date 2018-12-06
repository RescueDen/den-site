import ReduxAction from "redux";
import {Action as ActionRedux} from "redux";


class Action implements ActionRedux<string>{

    //This is the normal Action parameter required by redux
    type: string;

    //The payload can be anything
    payload: any;

    /**
     *
     */
    constructor(type:string, payload:any){
        this.type = type;
        this.payload =payload;
    }



}

export default Action;