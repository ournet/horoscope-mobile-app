
import { UserState } from './state';
import { UserActionTypes, UserActionType, UserErrorAction, UserSuccessAction } from './actions';

export function userReducer<A extends UserActionType>(state: UserState, action: A): UserState {

    switch (action.type) {
        case UserActionTypes.LOAD_USER_REQUESTED:
        case UserActionTypes.SAVE_USER_REQUESTED:
            return {
                ...state,
                isLoading: true
            };
        case UserActionTypes.LOAD_USER_ERRORED:
        case UserActionTypes.SAVE_USER_ERRORED:
            return {
                ...state,
                isLoading: false,
                error: (<UserErrorAction>action).error
            };
        case UserActionTypes.LOAD_USER_SUCCESSED:
        case UserActionTypes.SAVE_USER_SUCCESSED:
            return {
                ...state,
                isLoading: false,
                data: (<UserSuccessAction>action).response
            };
        default:
            return state || null;
    }
}
