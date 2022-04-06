import React from "react";
import Board from './Board';
import History from './History';

class Gametab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameMode: false,
      difficulty: 2,
      scores: [{player:"test", score: 4, date: Date()}],
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
          const penalty = 5-this.state.difficulty;
          const item = { player: "tk", score: s*penalty, date: Date() };
          this.setState({
            scores: [...this.state.scores, item]
          })
        }
      }
      
      export default Gametab;