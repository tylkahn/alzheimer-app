import React, {useState} from "react";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [...this.props.scores],
            asc: false,
        }
        this.sortScore = this.sortScore.bind(this);
    }

    getScores() {
        this.setState({
            scores: 0,
        })
    }

    formRow(entry) {
        const d = new Date(entry.date);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return(<tr><td>{entry.player}</td><td>{entry.score}</td><td>{day}/{month}/{year}</td></tr>)
    }

    sortScore(k) {
        var comp;
        if (k == 0) {
            const comp = function(a,b) {return a.score-b.score};
        } else {
            const comp = function(a,b) {return a.date.getTime()-b.date.getTime()};
        }
        let newScores = this.state.scores.sort(comp);
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