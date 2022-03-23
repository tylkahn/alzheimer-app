import React, {useState} from "react";
import Board from './Board'

class Gametab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameMode: false,
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

    render() {
        return (
          <div className="game">
            {this.state.isGameMode
              ? <button className="GameButton" onClick={this.handleEndGame}>End Game</button>
              : <button className="GameButton" onClick={this.handleStartGame}>Start Game</button>
            }
            <div className="game-board">
              {this.state.isGameMode && <Board />}
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
}

export default Gametab;