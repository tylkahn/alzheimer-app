import React from "react";
import Board from './Board';
import History from './History';
import axios from "axios";

class Gametab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameMode: false,
      difficulty: 2,
      scores: [{player:"test", score: 4, date: Date()}, {player:"test", score: 12, date: Date()}, {player:"test", score: 8, date: Date()}],
    };
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitScore = this.submitScore.bind(this);
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
    var d = 2;
    if (event.target.value == "Easy") {
      d = 2;
    } else if (event.target.value == "Medium") {
      d = 3;
    } else {
      d = 4;
    }
    this.setState ({
      difficulty: d,
    });
  }

  test() {
    const item = { title: "test", reminderType: 'O', repeating: 'O'}
    axios
      .post("/api/reminders/", item)
      .catch((err) => console.log(err));
  }
  
  render() {
    return (
      <div className="game">
      {!this.state.isGameMode &&
        <div className="game-init">
        <form onSubmit={this.handleStartGame}>
        <label>
        Select Difficulty:&nbsp;
        <select difficulty={this.state.difficulty} onChange={this.handleChange}>
        <option difficulty="easy">Easy</option>
        <option difficulty="medium">Medium</option>
        <option difficulty="hard">Hard</option>
        </select>
        </label>
        &nbsp;
        <input type="submit" value="Start Game" />
        </form>
        <button onClick={this.test}></button>
        <History scores={this.state.scores}/>
        </div>}
        {this.state.isGameMode && 
          <div className="game-board">
          <Board onEnd={this.handleEndGame} size={this.state.difficulty} submit={this.submitScore}/>
          </div>}
          </div>
          );
        }
        
        submitScore(s) {
          const item = { player: "tk", score: s, date: Date() };
          axios
            .post("/api//", item);
          this.setState({
            scores: [...this.state.scores, item]
          })
        }
      }
      
      export default Gametab;