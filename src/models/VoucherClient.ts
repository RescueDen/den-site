import {Address} from "./Address";

export interface VoucherClient {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    group: string;
    email: string;
    address: Address;
    notes: string;
}

export interface VoucherClientContact {
    name: string;
    phone: string;
    email: string;
}