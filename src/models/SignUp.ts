


//Store the form information
export interface SignUpResponse{
    //And the meta data
    signupForm: SignUpForm
    existingSignUps:ExistingSignUps|undefined
}


//Store the sign up form information
export interface SignUpForm{
    //And the meta data
    JSONSchema:any;
    UISchema:any;
    formData:any;
    rowid:number;

}


//Store the sign up form information
export interface ExistingSignUps{
    //And the meta data
    headers:string[];
    rowids:number[];
    values:any[][];

}
