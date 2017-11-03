
import { User } from "../../domain";

export interface UserState {
    isLoading: boolean
    data?: User
    error?: Error
}
