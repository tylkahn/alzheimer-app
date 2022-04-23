import React from "react";
import axios from "axios";
import Board from "./Board";
import History from "./History";

// const axiosInstance = axios.create({ withCredentials: true });
// axios.defaults.withCredentials = true;

/* eslint-disable */
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
    var d = 2;
    if (event.target.value == "Easy") {
      d = 2;
    } else if (event.target.value == "Medium") {
      d = 3;
    } else {
      d = 4;
    }
    this.setState({
      difficulty: d,
    });
  }

  // test() {
  //   const item = { score: 60 }
  //   axios
  //     .post("/api/game/", item)
  //     .catch((err) => console.log(err));
  // }

  // render the gametab, create the history and board components
  render() {
    return (
      <div className="game">
        {!this.state.isGameMode && (
          <div className="game-init">
            <form onSubmit={this.handleStartGame}>
              <label>
                Select Difficulty:&nbsp;
                <select
                  difficulty={this.state.difficulty}
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
            <button onClick={this.test}></button>
            <History />
          </div>
        )}
        {this.state.isGameMode && (
          <div className="game-board">
            <Board
              onEnd={this.handleEndGame}
              size={this.state.difficulty}
              submit={this.submitScore}
            />
          </div>
        )}
      </div>
    );
  }

  // post the score to the db
  submitScore(s) {
    const item = { score: s };
    axios.post(process.env.REACT_APP_SERVER_BASE_URL + "api/game/", item);
  }
}

export default Gametab;
