"use strict";
/* PLOP_INJECT_IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
/* PLOP_INJECT_GLOBAL_CODE */
// This function returns the quantity of keys present in obj.
const GetQtyKeysInObj = (obj) => {
    if (!obj) {
        return null;
    }
    return Object.keys(obj).length;
};
exports.default = GetQtyKeysInObj;
