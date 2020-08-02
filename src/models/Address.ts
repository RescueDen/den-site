export interface Address{
    address:string;
    city:string;
    state:string;
    country:string;
    zipCode:string;
    coordinate?:Coordinate;
}

export interface Coordinate{
    latitude:number;
    longitude:number;
}

export function EmptyAddress(): Address{
    return{
        address: "", city: "", country: "US", state: UsStates[0].value, zipCode: ""
    }
}

export const UsStates = [{key:"AL", value:"AL", text:"AL"},{key:"AK", value:"AK", text:"AK"},{key:"AZ", value:"AZ", text:"AZ"},{key:"AR", value:"AR", text:"AR"},{key:"CA", value:"CA", text:"CA"},{key:"CO", value:"CO", text:"CO"},{key:"CT", value:"CT", text:"CT"},{key:"DE", value:"DE", text:"DE"},{key:"DC", value:"DC", text:"DC"},{key:"FL", value:"FL", text:"FL"},{key:"GA", value:"GA", text:"GA"},{key:"HI", value:"HI", text:"HI"},{key:"ID", value:"ID", text:"ID"},{key:"IL", value:"IL", text:"IL"},{key:"IN", value:"IN", text:"IN"},{key:"IA", value:"IA", text:"IA"},{key:"KS", value:"KS", text:"KS"},{key:"KY", value:"KY", text:"KY"},{key:"LA", value:"LA", text:"LA"},{key:"ME", value:"ME", text:"ME"},{key:"MD", value:"MD", text:"MD"},{key:"MA", value:"MA", text:"MA"},{key:"MI", value:"MI", text:"MI"},{key:"MN", value:"MN", text:"MN"},{key:"MS", value:"MS", text:"MS"},{key:"MO", value:"MO", text:"MO"},{key:"MT", value:"MT", text:"MT"},{key:"NE", value:"NE", text:"NE"},{key:"NV", value:"NV", text:"NV"},{key:"NH", value:"NH", text:"NH"},{key:"NJ", value:"NJ", text:"NJ"},{key:"NM", value:"NM", text:"NM"},{key:"NY", value:"NY", text:"NY"},{key:"NC", value:"NC", text:"NC"},{key:"ND", value:"ND", text:"ND"},{key:"OH", value:"OH", text:"OH"},{key:"OK", value:"OK", text:"OK"},{key:"OR", value:"OR", text:"OR"},{key:"PA", value:"PA", text:"PA"},{key:"RI", value:"RI", text:"RI"},{key:"SC", value:"SC", text:"SC"},{key:"SD", value:"SD", text:"SD"},{key:"TN", value:"TN", text:"TN"},{key:"TX", value:"TX", text:"TX"},{key:"UT", value:"UT", text:"UT"},{key:"VT", value:"VT", text:"VT"},{key:"VA", value:"VA", text:"VA"},{key:"WA", value:"WA", text:"WA"},{key:"WV", value:"WV", text:"WV"},{key:"WI", value:"WI", text:"WI"},{key:"WY", value:"WY", text:"WY"},];

const zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

export function ValidateAddress(address:Address): {[location: string]: string; } {
    let errors = {} as {[location: string]: string; };

    if(!address.address){
        errors.address = "the street address must be specified"
    }
    if(!address.city){
        errors.city = "the city must be specified"
    }

    if(!UsStates.some(u => u.value === address.state)){
        errors.state = "invalid US state"
    }

    if(!zipCodePattern.test(address.zipCode)){
        errors.zipCode = "zip code is expected to be format 12345 or 12345-6789"
    }

    return errors;
}