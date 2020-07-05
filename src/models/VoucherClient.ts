
export interface VoucherClient{
    id: number;
    name:string;
    phone:string;
    group:string;
    email:string;
    address:string;
    notes:string;
}

export interface VoucherClientContact {
    name: string;
    phone: string;
    email: string;
}