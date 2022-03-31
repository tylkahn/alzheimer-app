import React from "react";

class Entry extends React.Component { //extend this journal entry from a generic entry class
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            images: [],
            lastUpdated: 0,
            tagList: [],//since im storing on the frontend, this stuff isnt useful yet
        };
    }
    
    /*migrate these functions to the Entry class */
    setJournalLastUpdated(time){
      this.setState(
          { lastUpdated: time }
      );
    }

    modifyTitle(t){
        this.setState(
            { title: t }
        );
    }

    modifyDescription(desc){
        this.setState(
            { description: desc }
        );
    }

    render() {
        return (
          //entry-footer will contain the Edit button (inside the small tag)
          <div className='entry'>
            <span>
              <div className="entry-title">
                {this.state.title}<br/>
              </div>
              <div className="entry-description">
                {this.state.description}<br/>
              </div>
            </span>
            <div className="entry-footer">
              <small>Edit</small>
            </div>
          </div>
        );
    }
}

export default Entry;