import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Board from "./Board";
import History from "./History";

class Gametab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameMode: false,
      difficulty: 2,
    };
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitScore = this.submitScore.bind(this);
  }

  // enable the game mode
  handleStartGame() {
    this.setState({
      isGameMode: true,
    });
  }

  // disable the game mode
  handleEndGame() {
    this.setState({
      isGameMode: false,
    });
  }

  // toggle the difficulty based on user input
  handleChange(event) {
    let d = 2;
    if (event.target.value === "Easy") {
      d = 2;
    } else if (event.target.value === "Medium") {
      d = 3;
    } else {
      d = 4;
    }
    this.setState({
      difficulty: d,
    });
  }

  // post the score to the db
  // eslint-disable-next-line class-methods-use-this
  submitScore(s) {
    const item = { score: s };
    const config = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}api/game/`,
      item,
      config
    );
  }

  // render the gametab, create the history and board components
  render() {
    const { difficulty, isGameMode } = this.state;
    return (
      <div className="game">
        {!isGameMode && (
          <div className="game-init">
            <form onSubmit={this.handleStartGame}>
              <label htmlFor="gameDifficulty">
                Select Difficulty:&nbsp;
                <select
                  id="gameDifficulty"
                  difficulty={difficulty}
                  onChange={this.handleChange}
                >
                  <option difficulty="easy">Easy</option>
                  <option difficulty="medium">Medium</option>
                  <option difficulty="hard">Hard</option>
                </select>
              </label>
              &nbsp;
              <input type="submit" value="Start Game" />
            </form>
            <History />
          </div>
        )}
        {isGameMode && (
          <div className="game-board">
            <Board
              onEnd={this.handleEndGame}
              size={difficulty}
              submit={this.submitScore}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Gametab;
