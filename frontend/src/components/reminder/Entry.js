import React from "react";

class Entry extends React.Component {
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

    // getID() = () = { return this.state.id; }

    // getTitle(){ return this.state.title; }

    // getDescription(){ return this.state.description; }

    // getImages(){ return this.state.images; }
    
    // getLastUpdated(){ return this.state.lastUpdated; }
    
    // getTagList(){ return this.state.tagList; }

    render() {
        return (
          <div className="entry">
            Entry
          </div>
        );
      }
}

export default Entry;