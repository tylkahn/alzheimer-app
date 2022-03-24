import React from "react";
import Board from './Board'

class Gametab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameMode: false,
            difficulty: "easy",
        };
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleEndGame = this.handleEndGame.bind(this);
    }

    handleStartGame() {
        this.setState({
            isGameMode: true,
        });
    }

    handleEndGame() {
        this.setState({
            isGameMode: false,
        });
    }

    handleChange(event) {
        this.setState ({
            difficulty: event.target.value,
        });
    }

    render() {
        return (
          <div className="game">
            <div className="game-init">
                {!this.state.isGameMode &&
                <form onSubmit={this.handleStartGame}>
                    <label>
                    Select Difficulty:&nbsp;
                    <select difficulty={this.state.difficulty} onChange={this.handleChange}>
                        <option difficulty="easy">Easy</option>
                        <option difficulty="medium">Medium</option>
                        <option difficulty="hard">hard</option>
                    </select>
                    </label>
                    &nbsp;
                    <input type="submit" value="Start Game" />
                </form>}
            </div>
            {this.state.isGameMode && 
            <div className="game-board">
              <Board onEnd={this.handleEndGame}/>
            </div>}
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
}

export default Gametab;