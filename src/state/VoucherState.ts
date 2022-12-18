import {VoucherInfo, VoucherSearch, VoucherSearchResults} from "../models/Voucher";

/**
 * This Holds the global voucher state
 */
export default interface VoucherState {
    info?: VoucherInfo;

    //Store current search
    currentSearch: VoucherSearch;

    //And any results
    results?: VoucherSearchResults;

    //Store if we are currently updating
    updating: boolean;
}
