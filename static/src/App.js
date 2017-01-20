import React, { Component } from 'react';
import Grommet from 'grommet';

import ItemInput from './components/ItemInput';
import ItemOutput from './components/ItemOutput';

import './App.css';

class App extends Component {
  render() {
    return (
      <Grommet.App centered={false}>
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

export default App;