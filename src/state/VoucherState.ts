import {PersonData} from "../models/People";
import {VoucherInfo} from "../models/Voucher";

/**
 * This Holds the global voucher state
 */
export default interface VoucherState {
    info?:VoucherInfo;
}
