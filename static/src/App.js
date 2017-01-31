import React, { Component } from 'react';
import Grommet from 'grommet';

import ItemInput from './components/ItemInput';
import ItemOutput from './components/ItemOutput';
import CreateContractModal from './components/CreateContractModal';
import { toastHidden } from './actions';

import { connect } from 'react-redux';

import './App.css';

class App extends Component {

  renderToast() {
    if (this.props.toastdata.visible) {
      return (<Grommet.Toast status='ok' onClose={() => this.props.dispatch(toastHidden())}>
        <Grommet.Box direction='row' justify='between' alignSelf='center'>
          <span>{this.props.toastdata.text}</span>
        </Grommet.Box>
      </Grommet.Toast>);
    } else {
      return (
        <div></div>
      )
    }
  }

  renderCreateContractModal() {
    if(this.props.createContractModalVisible) {
      return (<CreateContractModal />)
    }
  }




  render() {
    return (
      <Grommet.App centered={false}>
        {this.renderToast()}
        {this.renderCreateContractModal()}
        <Grommet.Header colorIndex="grey-2" fixed={true} size="small">
          <Grommet.Box align="center" pad="medium">Intrepid Crossing Calculator </Grommet.Box>
        </Grommet.Header>
        <Grommet.Split>
          <ItemInput />
          <ItemOutput />
        </Grommet.Split>
        <Grommet.Footer alignContent="center">
          <Grommet.Paragraph>
            © Intrepid Crossing 2016 - Created by <a href="twitter.com/yantrio">@Yantrio</a>
          </Grommet.Paragraph>
        </Grommet.Footer>
      </Grommet.App>
    );
  }
}

function mapStateToProps(state) {
    return {
        toastdata: state.toastdata,
        createContractModalVisible: state.createContractModalVisible
    }
}

export default connect(mapStateToProps)(App);