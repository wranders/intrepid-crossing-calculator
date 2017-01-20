import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grommet from 'grommet';
import Spinning from 'grommet/components/icons/Spinning';


class ItemOutput extends Component {

    renderLoadBar() {
        return (
            <Spinning />
        )
    }

    numberWithCommas(x) {
        return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    renderItems() {
        return this.props.data.map((item) => {
            let name = item.name;
            let quantity = item.quantity;
            let pricePer = item.jitaBuyPrice;
            let total = quantity * pricePer;
            let imageUrl = `https://image.eveonline.com/Type/${item.itemId}_64.png`;
            return (
                <Grommet.Animate visible={true} enter={{ "animation": "fade", "duration": 1000, "delay": 0 }}
                    keep={true} key={item.id}>
                    <Grommet.List>
                        <Grommet.ListItem justify="between" align="center" pad={{ horizontal: "medium" }}>
                            <Grommet.Paragraph>
                                <Grommet.Image size='thumb' src={imageUrl} />
                                {this.numberWithCommas(quantity)} x {name}
                            </Grommet.Paragraph>
                            <Grommet.Paragraph>
                                {this.numberWithCommas(total)}
                            </Grommet.Paragraph>
                        </Grommet.ListItem>
                    </Grommet.List>
                </Grommet.Animate>
            );
        });
    }
    render() {
        let total = 0;
        this.props.data.forEach((item) => {
            total += item.quantity * item.jitaBuyPrice;
        })
        return (
            <Grommet.Box pad="medium" colorIndex="light-2" announce={false} full="vertical">
                <h2>Output {total !== 0 ? '      Total : ' + this.numberWithCommas(total) + 'isk' : ''}</h2>
                {this.props.fetching ? (
                    this.renderLoadBar()
                ) : (
                    <div>
                    {this.renderItems()}
                    </div>        
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