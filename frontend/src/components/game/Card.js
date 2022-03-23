import React, {useState} from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            matched: false,
        }
    }

    render() {
        return (
            <button className="gamecard" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Card;