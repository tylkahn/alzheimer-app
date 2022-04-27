import React from "react";

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "0",
            title: "The Title",
            description: "The description",
        };
    }

    getID(){ 
      const {id} = this.state;
      return id;
    }

    getTitle(){ 
      const {title} = this.state;
      return title; 
    }

    getDescription(){ 
      const {description} = this.state;
      return description; 
    }

    render() {
      return (
        <div className="entry">
          Entry
          <div>
            {this.getTitle()}
          </div>
          <div>
            id: {this.getID()}
          </div>
          <div>
            description: {this.getDescription()}
          </div>
        </div>
      );
      }
}

export default Entry;