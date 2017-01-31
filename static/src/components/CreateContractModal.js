import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grommet from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import CopyIcon from 'grommet/components/icons/base/Copy';

import { showToast, hideCreateContractModal } from '../actions';

class CreateContractModal extends Component {

    numberWithCommas(x) {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    copyToClipboard(text) {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = text;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();
        this.props.dispatch(showToast({
            visible: true,
            text: `Copied "${text}" to the clipboard`, 
            status: 'ok'
        }));
    }

    render() {
        let total = 0;
        this.props.data.results.forEach((item) => {
            total += item.quantity * item.jitaBuyPrice;
        });
        total = Math.round(total);
        if(this.props.visible) {
            return (
            <Grommet.Layer className="layer-extra-padding" closer={true} onClose={() => this.props.dispatch(hideCreateContractModal())}>
                    <Grommet.Heading align='center'>Create Contract</Grommet.Heading>
                    <p> Please create a contract using the following information </p>

                    <Grommet.Table>
                        <tbody>
                            <Grommet.TableRow>
                                <td></td>
                                <td><b>Contract Type</b></td>
                                <td className="rightalign">Item</td>
                            </Grommet.TableRow>
                            <Grommet.TableRow>
                                <td><Grommet.Anchor icon={<CopyIcon />} onClick={() => this.copyToClipboard("Daddiodeath")} animateIcon={true} /></td>
                                <td><b>Recipient</b></td>
                                <td className="rightalign">Daddiodeath</td>
                            </Grommet.TableRow>
                            <Grommet.TableRow>
                                <td><Grommet.Anchor icon={<CopyIcon />} onClick={() => this.copyToClipboard("" + total)} animateIcon={true} /></td>
                                <td><b>Amount</b></td>
                                <td className="rightalign">{this.numberWithCommas(total)} isk</td>
                            </Grommet.TableRow>
                            <Grommet.TableRow>
                                <td><Grommet.Anchor icon={<CopyIcon />} onClick={() => this.copyToClipboard(`IRC-Contract-${this.props.data.id}`)} animateIcon={true} /></td>
                                <td><b>Reason</b></td>
                                <td className="rightalign">IRC-Contract-{this.props.data.id}</td>
                            </Grommet.TableRow>
                        </tbody>
                    </Grommet.Table>
                </Grommet.Layer>
            );
        } else {
            return (<div />);
        }
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        visible : state.createContractModalVisible
    }
}

export default connect(mapStateToProps)(CreateContractModal);