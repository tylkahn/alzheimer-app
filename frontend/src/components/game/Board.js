import React, {useState} from "react";
import Card from "./Card"

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [...Array(12).keys()].sort(() => Math.random() - 0.5),
      active1: null,
      active2: null,
      matched: Array(12).fill(false),
      score: 0,
    };
  }

  checkMatch() {
    return this.state.cards[this.state.active1] % 6 == this.state.cards[this.state.active2] % 6;
  }

  handleClick(i) {
    if (this.state.active1 === i || this.state.matched[i]) {

    } else if (this.state.active1 != null && this.state.active2 != null) {
      if (this.checkMatch()) {
        const newState = [...this.state.matched];
        newState[this.state.active1] = true;
        newState[this.state.active2] = true;
        this.setState({
          matched: newState,
        })
      }
      this.setState({
        active1: null,
        active2: null,
      })
    } else if (this.state.active1 != null) {
      this.setState({
        active2: i,
      })
      this.state.score++;
    } else {
      this.setState({
        active1: i,
      })
      this.state.score++;
    }
  }

  renderSquare(i) {
      const val = (this.state.active1 == i)|| (this.state.active2 == i) || this.state.matched[i] ? this.state.cards[i] % 6 : 'X';
      return <Card 
        value={val}
        onClick={() => this.handleClick(i)}
        status={this.state.matched[i]}
        active={this.state.active1===i || this.state.active2===i}
      />;
  }

  render() {
      return (
          <div>
            Flips: {this.state.score} (lower is better)
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
        </div>
      );
  }
}

function isComplete(matched) {
  for (let i=0; i < matched.length; i++) {
    if (matched[i]) {
      return false
    }
  }
  return true;
}

export default Board;