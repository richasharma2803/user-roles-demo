import { SET_USER_STATE } from "../../common/constants"

export const setuserState = (user: any) => {
    return {
        type : SET_USER_STATE,
        payload : user
    }
}