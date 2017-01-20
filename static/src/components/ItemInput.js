import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grommet from 'grommet';

import { textChanged } from '../actions';

class ItemInput extends Component {
    handleChange(e) {
        this.props.dispatch(textChanged(e.target.value));
    }

    render() {
        return (
            <Grommet.Box full="vertical" pad="medium" colorIndex="light-2" announce={false}>
                <h2>Input</h2>
                <textarea className="input-box" rows="4" cols="50" onChange={(e) => this.handleChange(e)} />
            </Grommet.Box>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        fetching : state.fetching
    }
};

export default connect(mapStateToProps)(ItemInput);