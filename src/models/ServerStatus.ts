export class ServerResponseStatus{
    readonly status:boolean;
    readonly message:string;

    constructor(status:boolean, message:string){
        this.status = status;
        this.message = message;
    }

}