import React, {useState} from "react";
import axios from "axios";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            asc: false,
        }
        this.sortScore = this.sortScore.bind(this);
    }

    componentDidMount() {
        this.getScores();
      }
    
    getScores = () => {
        axios
            .get("/api/game/")
            .then((res) => this.setState({ scores: res.data }))
            .catch((err) => console.log(err));
    };

    formRow(entry) {
        const d = new Date(entry.time);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return(<tr><td>{entry.player}</td><td>{entry.score}</td><td>{month}/{day}/{year}</td></tr>)
    }

    sortScore(k) {
        console.log(this.state)
        var newScores;
        if (k == 0) {
            newScores = this.state.scores.sort(function(a,b) {return a.score-b.score});
        } else {
            newScores = this.state.scores.sort(function(a,b) {return (new Date(a.time)).getTime()- (new Date(b.time)).getTime()});
        }
        if (this.state.asc) {
            newScores.reverse();
        }
        this.setState({
            scores: newScores,
            asc: !this.state.asc
        })
    }

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
            </div>
        )
    }
}

export default History;