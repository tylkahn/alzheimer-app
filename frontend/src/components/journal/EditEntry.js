import { nanoid } from "nanoid";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan);
library.add(faPenToSquare);
class EditEntry extends React.Component { //extend this journal entry from a generic entry class
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            lastUpdated: 0,
            tagList: [],//since im storing on the frontend, this stuff isnt useful yet
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

    modifyTitle = (event) => {
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTitle: event.target.value,
            });
        }
    }

    modifyDescription(event){
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTitle: event.target.value,
            });
        }
    }


    render = () => {
        return (
          //entry-footer will contain the Edit button (inside the small tag)

          /*<div onSubmit={this.onFormSubmit}>
                <input type="file" name="file" onChange={(e) => this.onChange(e)}/>
              </div>*/
          <div className='entry'>
            <span>
              <div className="entryt">
                <textarea 
                  type = "text" 
                  value = {this.state.title}
                  onChange={(e)=>{this.modifyTitle}}
                /><br/>
              </div>
              <div className="entryt">
                <textarea 
                  type = "text" 
                  value = {this.state.title}
                  onChange={(e)=>{this.modifyDescription}}
                /><br/>
              </div>
            </span>
            
            {this.state.images.map((img) => <img key={nanoid()} src={img} alt="info"></img>)}
            
            <div className="entry-footer">
                
                
            </div>

          </div>
          
        );
    }
}

export default Entry;