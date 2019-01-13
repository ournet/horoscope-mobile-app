import * as React from 'react';

export interface PromiseComponentProps<T> {
    promise: Promise<T>
    children: (result: PromiseComponentResult<T>) => React.ReactNode
}

interface PromiseComponentState<T> {
    loading: boolean
    error?: Error
    data?: T
}

export type PromiseComponentResult<T> = PromiseComponentState<T>

export default class PromiseComponent<T> extends React.Component<PromiseComponentProps<T>, PromiseComponentState<T>> {
    private mounted: boolean

    constructor(props: PromiseComponentProps<T>) {
        super(props);

        this.state = { loading: true };
        console.log('create PromiseComponent');
        setImmediate(() => this.executePromise(this.props.promise));
    }
    private executePromise(promise: Promise<T>) {
        try {
            return promise
                .then(data => this.onResult({ data, loading: false, error: undefined }))
                .catch(e => this.onResult({ error: e, loading: false, data: undefined }));
        } catch (e) {
            this.onResult({ error: e, loading: false, data: undefined })
        }
    }
    private onResult(result: PromiseComponentResult<T>) {
        if (!this.mounted) {
            return;
        }
        // console.log('RESULT', 'data', !!result.data, 'loading', result.loading);
        this.setState(result);
    }

    // shouldComponentUpdate(nextProps: PromiseComponentProps<T>, nextState: PromiseComponentState<T>) {
    //     console.log('nextState', JSON.stringify(nextState).substr(0, 50))
    //     return this.state.data !== nextState.data
    //         || this.state.loading !== nextState.loading
    //         || this.state.error !== nextState.error
    //     // || this.props.promise !== nextProps.promise;
    // }

    componentDidUpdate(prevProps: PromiseComponentProps<T>) {
        if (!this.mounted) {
            return;
        }

        if (prevProps.promise !== this.props.promise) {
            // console.log('new props...');

            setImmediate(() => {
                // this.setState({ loading: true, data: undefined, error: undefined });
                this.executePromise(this.props.promise);
            });
        }
    }
    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { children } = this.props;
        // console.log('STATE', 'data', !!this.state.data, 'loading', this.state.loading);
        return children(this.state);
    }
}