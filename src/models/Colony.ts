import {Address, EmptyAddress} from "./Address";

export interface Colony {
    id: number;
    name: string;
    group: string;
    address: Address;
}

export function EmptyColony(): Colony {
    return {
        address: EmptyAddress(), group: "", id: 0, name: ""
    }
}
