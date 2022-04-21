import { nanoid } from "nanoid"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(faTrashCan);
library.add(faPenToSquare);

class Entry extends React.Component { // extend this journal entry from a generic entry class
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            tagList: this.props.tagList, // since im storing on the frontend, this stuff isnt useful yet
            date: this.props.date,
            handleDeleteEntry: this.props.handleDeleteEntry,
            handleEditEntry: this.props.handleEditEntry,
        };
    }

    render = () => {
        return (
          <div className='entry'>
            
            <span>
              <div className="entry-title">
                {this.state.title} <br/>
              </div>
              <div className="entry-description">
                {this.state.description} <br/>
              </div>
            </span>
            
            {this.state.images.map(img => <img key={nanoid()} src={img} alt="info"></img>)}
            <div className = "tag-list">
            {this.state.tagList.map(tag => 
              (
                <button key={nanoid()} className="tag-button">
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