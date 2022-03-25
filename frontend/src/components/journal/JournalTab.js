import React from "react";

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: {"id": "", "title": "", "description": "", "images": [],
                "lastUpdated": 0, "tagList": []}
        };
    }

    render() {
        return (
          <div className="journal">
            Journal Stuff goes here! 
          </div>
        );
      }
}

export default JournalTab;