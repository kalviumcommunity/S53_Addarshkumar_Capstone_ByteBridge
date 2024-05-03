import {atom} from "recoil";

export const userState =atom({
    key:"userState",
    default:false
})

export const isLoaded=atom({
    key:"loadingState",
    default:false
})