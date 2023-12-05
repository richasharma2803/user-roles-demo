import { SET_USER_STATE } from "../../common/constants"

const initialState = {
    user : null
}

const UserReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case SET_USER_STATE:
            return {
                user : action.payload,
            }
        
        default : return state
    }
}

export default UserReducer;