
import * as React from 'react';
import { Interactors } from '../interactors';
import { User } from '../../domain';
import PromiseComponent, { PromiseComponentResult } from '../components/PromiseComponent';
import { Message } from '../components/Message';
import { Locales } from '../locales';
import { ValidLanguage } from '../config';
import { ViewUser, ViewUserMapper } from '../data/user';

interface Props {
    interactors: Interactors
    lang: ValidLanguage
    onInited: (user: ViewUser) => void
}

interface MainScreenState {

}

export default class MainScreen extends React.Component<Props, MainScreenState> {
    constructor(props: Props, context?: any) {
        super(props, context);

        this.state = {};
    }

    render() {
        const { lang } = this.props;

        return (
            <PromiseComponent<User> promise={this.props.interactors.user.load()}>
                {({ loading, error, data }: PromiseComponentResult<User>) => {
                    if (loading) {
                        return <Message type='info' message={Locales.get('loading', lang)}></Message>
                    }
                    if (error) {
                        return <Message type='danger' message={error.message}></Message>
                    }

                    const user = ViewUserMapper.fromDataUser(data);

                    setImmediate(() => this.props.onInited(user));

                    return null;
                }}
            </PromiseComponent>
        );
    }
}
