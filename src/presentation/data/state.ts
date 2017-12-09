
import { State as DataState } from '../../data';
import { NavigationState } from './navigation/state';

export interface State extends DataState {
    navigation: NavigationState
}
