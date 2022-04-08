import React from "react";
import Card from "./Card"

/* eslint-disable */
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.size = this.props.size * 6
    this.state = {
      cards: [...Array(this.size).keys()].sort(() => Math.random() - 0.5),
      active1: null,
      active2: null,
      matched: Array(this.size).fill(false),
      score: 0,
    };
    this.promptNext = this.promptNext.bind(this)
  }

  // check if the two active cards are matching
  checkMatch() {
    return this.state.cards[this.state.active1] % (this.size/2) == this.state.cards[this.state.active2] % (this.size/2);
  }

  // handle the user clicking on a card, update the state
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

  // render a specific card
  renderSquare(i) {
      const val = (this.state.active1 == i)|| (this.state.active2 == i) || this.state.matched[i] ? (this.state.cards[i] % (this.size/2)) : '?';
      return <Card 
        value={val}
        onClick={() => this.handleClick(i)}
        status={this.state.matched[i]}
        active={this.state.active1===i || this.state.active2===i}
      />;
  }

  // run the endgame 
  promptNext() {
    const finalScore = (5 - this.props.size) * this.state.score;
    this.props.submit(finalScore);
    this.props.onEnd();
  }

  // render a single row of cards
  renderRow(v) {
    let i = v*6;
    return (
      <div className="board-row">
        {this.renderSquare(i)}
        {this.renderSquare(i+1)}
        {this.renderSquare(i+2)}
        {this.renderSquare(i+3)}
        {this.renderSquare(i+4)}
        {this.renderSquare(i+5)}
      </div>
    )
  }

  // render the game board
  render() {
    const completed = isComplete(this.state.matched);
    const finalScore = (5 - this.props.size) * this.state.score;
    console.log(completed);
    return (
      <div className="gameBoard">
        {completed &&
        <div>
          <h1>Congratualations</h1>
          <h2>Your final score was {finalScore}</h2>
          <button className="button" onClick={this.promptNext}>Return</button>
        </div>}
        {!completed &&
        <div>
          Flips: {this.state.score} (lower is better)
          {[...Array(this.props.size)].map((_,i) => this.renderRow(i))}
          <button className="button" onClick={this.props.onEnd}>End Game</button>
        </div>}
      </div>
    );
  }
}

// check if all cards are matched (the game is done)
function isComplete(matched) {
  for (let i=0; i < matched.length; i++) {
    if (!matched[i]) {
      return false
    }
  }
  return true;
}

export default Board;