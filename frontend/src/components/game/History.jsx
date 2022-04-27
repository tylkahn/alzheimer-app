import React from "react";
import axios from "axios";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      asc: false,
    };
    this.sortScore = this.sortScore.bind(this);
  }

  // initialize scores on mount
  componentDidMount() {
    this.getScores();
  }

  // update scores from the db
  getScores = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}api/game/`)
      .then((res) => this.setState({ scores: res.data }))
      .catch((err) => console.log(err));
  };

  // return a single row populated with a score entry
  // eslint-disable-next-line class-methods-use-this
  formRow(entry) {
    const d = new Date(entry.date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return (
      <tr>
        <td>{entry.player}</td>
        <td>{entry.score}</td>
        <td>
          {month}/{day}/{year}
        </td>
      </tr>
    );
  }

  // sort the scores list by the desired property
  sortScore(k) {
    // console.log(this.state);
    const { scores, asc } = this.state;
    let newScores;
    // TODO: can this be safely changed to === ?
    // eslint-disable-next-line eqeqeq
    if (k == 0) {
      newScores = scores.sort((a, b) => a.score - b.score);
    } else {
      newScores = scores.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }
    if (asc) {
      newScores.reverse();
    }
    this.setState((prevState) => ({
      scores: newScores,
      asc: !prevState.asc,
    }));
  }

  // render the scores table
  render() {
    const { scores } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>
                <button
                  className="gamebutton"
                  type="button"
                  onClick={() => this.sortScore(0)}
                >
                  Score
                </button>
              </th>
              <th>
                <button
                  className="gamebutton"
                  type="button"
                  onClick={() => this.sortScore(1)}
                >
                  Date
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{scores.map((entry) => this.formRow(entry))}</tbody>
        </table>
        <button className="gamebutton" type="button" onClick={this.getScores}>
          Refresh
        </button>
      </div>
    );
  }
}

export default History;
