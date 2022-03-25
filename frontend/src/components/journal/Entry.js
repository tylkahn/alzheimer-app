import React from "react";

class Entry extends React.Component { //extend this journal entry from a generic entry class
    constructor(props) {
        super(props);
        this.state = {
            id: "0",
            title: "The Title",
            description: "The description",
            images: [],
            lastUpdated: 0,
            tagList: [],
        };
    }
    getID(){ return id; }
    getTitle(){ return title; }
    getLastUpdated(){ return lastUpdated; }
    getTagList(){ return tagList; }

    render() {
        return (
          <div className="journal">
            Journal Stuff goes here! 
          </div>
        );
      }
}

export default JournalTab;