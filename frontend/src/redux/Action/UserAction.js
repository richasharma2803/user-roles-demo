import { SET_USER_STATE } from "../../common/constants"

export const setuserState = (user) => {
    return {
        type : SET_USER_STATE,
        payload : user
    }
}