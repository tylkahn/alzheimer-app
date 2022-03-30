import React from "react";
/*
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
          <div className="entry">
            Entry information goes here! ?
          </div>
        );
      }
}
*/

//i think this function only does rendering, so to transfer it into what we have, just have it be under the class's render() function
//entry-footer will contain the Edit button (inside the small tag)
const Entry = () => {
  return (
  <div className='entry'>
    <span>This is an entry!</span>
    <div className="entry-footer">
      <small>Edit</small>
    </div>
  </div>
  )
}
export default Entry;