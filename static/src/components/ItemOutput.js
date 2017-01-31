import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grommet from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';
import NextIcon from 'grommet/components/icons/base/Next';

import { showToast, showCreateContractModal } from '../actions';

class ItemOutput extends Component {
    renderLoadBar() {
        return (
            <Spinning />
        )
    }

    createContract() {
        this.props.dispatch(showCreateContractModal());
    }

    numberWithCommas(x) {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    renderItems() {
        return this.props.data.results.map((item) => {
            let name = item.name;
            let quantity = item.quantity;
            let pricePer = item.jitaBuyPrice;
            let total = quantity * pricePer;
            let imageUrl = `https://image.eveonline.com/Type/${item.itemId}_32.png`;
            let colour = item.success ? '' : 'warning';
            return (
                <Grommet.Animate visible={true} enter={{ "animation": "fade", "duration": 1000, "delay": 0 }}
                    keep={true} key={item.id}>
                    <Grommet.ListItem colorIndex={colour} justify="between" align="center" pad={{ horizontal: "none", vertical: "none" }}>
                        <Grommet.Paragraph size='small' className='item-output'>
                            <Grommet.Image size='thumb' full={false} src={imageUrl} className='item-output-image' />
                            {this.numberWithCommas(quantity)} x {name}
                        </Grommet.Paragraph>
                        <Grommet.Paragraph size='small' className='item-output'>
                            {this.numberWithCommas(total)}
                        </Grommet.Paragraph>
                    </Grommet.ListItem>
                </Grommet.Animate>
            );
        });
    }

    renderOutputTitle(total) {
        if (total === 0) {
            return (
                <div>
                    <h2>Output</h2>
                </div>
            );
        } else {
            return (
                <div>
                    <h2 className="floatleft">Output Total :{this.numberWithCommas(total)}isk</h2>
                    <Grommet.Anchor className="floatright" icon={<NextIcon />} onClick={() => this.createContract()}/>
                </div>
            );
        }
    }

    render() {
        let total = 0;
        this.props.data.results.forEach((item) => {
            total += item.quantity * item.jitaBuyPrice;
        });
        return (
            <Grommet.Box pad="medium" colorIndex="light-2" announce={false} full="vertical">
                {this.renderOutputTitle(total)}
                {this.props.fetching ? (
                    this.renderLoadBar()
                ) : (
                        <Grommet.List>
                            {this.renderItems()}
                        </Grommet.List>
                    )}
            </Grommet.Box>
        );
    }
}

function mapStateToProps(state) {
    return {
        fetching: state.fetching,
        data: state.data
    }
}

export default connect(mapStateToProps)(ItemOutput);