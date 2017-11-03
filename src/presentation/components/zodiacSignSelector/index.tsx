
import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal, TouchableHighlight } from 'react-native'
import { ZodiacSign } from '../../../domain';
import { State } from '../../../data';
import { ViewData, createViewData } from './ViewData';
// import { Interactors } from '../../interactors';
// temp solution
import { Instance as interactors } from '../../interactors';

interface Props {
    data?: ViewData
    visible: boolean
    // interactors: Interactors
}

const mapStateToProps = (state: State, props: Props): Partial<Props> => {
    const data = props.data || state && createViewData(state.user);
    return {
        data,
        visible: props.visible === true
    };
};

class ZodiacSignSelector extends React.PureComponent<Props, State> {
    selectZodiacSign(id: ZodiacSign) {
        interactors.user.save({ zodiacSign: id });
    }

    onRequestClose() {
        
    }

    render() {
        const { zodiacSign, texts, zodiacSignsImages } = this.props.data;

        if (zodiacSign) {
            return null;
        }

        const buttons = zodiacSignsImages.map(image => (
            <TouchableHighlight key={image.id} onPress={() => this.selectZodiacSign(image.id)}>
                <Text>{image.id}</Text>
            </TouchableHighlight>)
        );

        return (
            <View style={{ marginTop: 22 }}>
                <Modal onRequestClose={this.onRequestClose}
                    animationType="slide"
                    transparent={false}
                    visible={true}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>{texts.selectYourZodiacSign}</Text>

                            {buttons}
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default connect<Partial<Props>>(mapStateToProps)(ZodiacSignSelector);
