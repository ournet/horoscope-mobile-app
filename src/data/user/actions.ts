
import { User } from '../../domain';

export enum UserActionTypes {
    LOAD_USER_REQUESTED = 'LOAD_USER_REQUESTED',
    LOAD_USER_ERRORED = 'LOAD_USER_ERRORED',
    LOAD_USER_SUCCESSED = 'LOAD_USER_SUCCESSED',
    SAVE_USER_REQUESTED = 'SAVE_USER_REQUESTED',
    SAVE_USER_ERRORED = 'SAVE_USER_ERRORED',
    SAVE_USER_SUCCESSED = 'SAVE_USER_SUCCESSED'
}

export interface UserAction {
    type: UserActionTypes
}

export interface UserErrorAction extends UserAction {
    error: Error
}

export interface UserSuccessAction extends UserAction {
    response?: User
}

export type UserActionType = UserAction | UserErrorAction | UserSuccessAction;

export function loadUser()
    : UserAction {
    return {
        type: UserActionTypes.LOAD_USER_REQUESTED
    };
}

export function loadUserError(error: Error)
    : UserErrorAction {
    return {
        type: UserActionTypes.LOAD_USER_ERRORED,
        error: error
    };
}

export function loadUserSuccess(user: User)
    : UserSuccessAction {
    return {
        type: UserActionTypes.LOAD_USER_SUCCESSED,
        response: user
    };
}

export function saveUser()
    : UserAction {
    return {
        type: UserActionTypes.SAVE_USER_REQUESTED
    };
}

export function saveUserError(error: Error)
    : UserErrorAction {
    return {
        type: UserActionTypes.SAVE_USER_ERRORED,
        error: error
    };
}

export function saveUserSuccess(user: User)
    : UserSuccessAction {
    return {
        type: UserActionTypes.SAVE_USER_SUCCESSED,
        response: user
    };
}
