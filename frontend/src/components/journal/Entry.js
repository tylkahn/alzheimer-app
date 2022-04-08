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
            date: this.props.date,
            tagList: [],
            handleDeleteEntry: this.props.handleDeleteEntry,
            handleEditEntry: this.props.handleEditEntry,
        };
        
    }
    
    setJournalLastUpdated(time){
      this.setState(
          { lastUpdated: time }
      );
    }

    render = () => {
        return (
          <div className='entry'>
            
            <span>
              <div className="entry-title">
                {this.state.title} <br/>
              </div>

              <h6>
                <i>{this.state.date.split('T')[0]}</i>
              </h6>

              <div className="entry-description">
                {this.state.description} <br/>
              </div>
            </span>
            
            {this.state.images.map((img) => <img key={nanoid()} src={img} alt="info"></img>)}
            
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