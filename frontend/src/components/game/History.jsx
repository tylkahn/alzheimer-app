import React from "react";
import axios from "axios";

/* eslint-disable */
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            asc: false,
        }
        this.sortScore = this.sortScore.bind(this);
    }

    // initialize scores on mount
    componentDidMount() {
        this.getScores();
    }
    
    // update scores from the db
    getScores = () => {
        axios
            .get("/api/game/")
            .then((res) => this.setState({ scores: res.data }))
            .catch((err) => console.log(err));
    };

    // return a single row populated with a score entry
    formRow(entry) {
        const d = new Date(entry.date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return(<tr><td>{entry.player}</td><td>{entry.score}</td><td>{month}/{day}/{year}</td></tr>)
    }

    // sort the scores list by the desired property
    sortScore(k) {
        console.log(this.state)
        let newScores;
        if (k == 0) {
            newScores = this.state.scores.sort((a,b) => a.score-b.score);
        } else {
            newScores = this.state.scores.sort((a,b) => (new Date(a.date)).getTime()- (new Date(b.date)).getTime());
        }
        if (this.state.asc) {
            newScores.reverse();
        }
        this.setState({
            scores: newScores,
            asc: !this.state.asc
        })
    }

    // render the scores table
    render() {
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th><button type="button" onClick={() => this.sortScore(0)}>
                            Score
                            </button></th>
                            <th><button type="button" onClick={() => this.sortScore(1)}>
                            Date
                            </button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.scores.map(entry => this.formRow(entry))}
                    </tbody>
                </table>
                <button type="button" onClick={this.getScores}>Refresh</button>
            </div>
        )
    }
}

export default History;