import React from "react";

// render a card with proper styling
class Card extends React.Component {
  render() {
    const style = this.props.status
      ? "matching"
      : this.props.active
      ? "game-active"
      : "gamecard";
    return (
      <button className={style} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Card;
