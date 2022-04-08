import { nanoid } from "nanoid";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan);
library.add(faPenToSquare);
class Entry extends React.Component { //extend this journal entry from a generic entry class
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            lastUpdated: 0,
            tagList: this.props.tagList,//since im storing on the frontend, this stuff isnt useful yet
            handleDeleteEntry: this.props.handleDeleteEntry,
            handleEditEntry: this.props.handleEditEntry,
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


    render = () => {
        return (
          //entry-footer will contain the Edit button (inside the small tag)

          /*<div onSubmit={this.onFormSubmit}>
                <input type="file" name="file" onChange={(e) => this.onChange(e)}/>
              </div>*/
          <div className='entry'>
            <span>
              <div className="entry-title">
                {this.state.title} <br/>
              </div>
              <div className="entry-description">
                {this.state.description} <br/>
              </div>
            </span>
            
            {this.state.images.map((img) => <img key={nanoid()} src={img} alt="info"></img>)}
            <div className = "tag-list">
            {this.state.tagList.map(tag => (
                <button className="tag-button">
                  {tag}
                </button>
                ),
            )}
            </div>
            
            <div className="entry-footer">
                <button
                  onClick={() => this.state.handleEditEntry(this.state.id)}
                  className='edit' >
                  <FontAwesomeIcon icon="pen-to-square" />
                </button>
                <button
                  onClick={() => this.state.handleDeleteEntry(this.state.id)}
                  className='delete' >
                  <FontAwesomeIcon icon="trash-can" />
                </button>
            </div>

          </div>
          
        );
    }
}

export default Entry;