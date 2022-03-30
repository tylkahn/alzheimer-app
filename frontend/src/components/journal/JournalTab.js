import React from "react";
import Entry from './Entry'
import {nanoid} from 'nanoid';

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: this.props.entries,
            entryText: '',
        };
        console.log(this.state.entryList[1]);

        this.handleSaveClick = this.handleSaveClick.bind(this);
    }
    
    //obtains new entry information and calls save function
    createJournalEntry(){//addNote.js
        const handleChange = (event) => {
            //event.target.value is what was typed into the text area
            this.setState({
                entryText: event.target.value
            });
            console.log(this.state.entryText);
            
        }

        const handleSaveClick = () => {
            const new_entry = new Entry();
            new_entry.id = "2983091w3";
            new_entry.description = "hello";
            new_entry.title = "hi again";
            return (
                 
                    new_entry
            
            )
        }
        return (
            <div className="entry new">
                <textarea 
                    rows='8'
                    cols = '10'
                    placeholder='Type to create the Journal Entry...'
                    //value={entryText}
                    onChange={handleChange}
                ></textarea>
                <div className="entry-footer">
                    <small>Characters remaining: 100</small>
                    <button onClick={this.handleSaveClick}>
                        Save
                    </button>
                </div>
            </div>
        )
    }
    //this.load(props.id)->which calls create
    //this.save(props.id)

    

    //this one is specific to journalentries
    modifyImageList(action, jpg){
        if (action === "addImage"){
            this.setState(
                { images: [...jpg] }
            );
        }
        else if (action === "removeImage"){

        }
    }

    render() {
        //kinda the noteslist.js

        //should loop through this.state.entryList and render each entry from there
        return (
          <div className="journal">       
              <div className="entry-list">
              <this.createJournalEntry/>
                My NON-hard-coded list: 
                {this.state.entryList.map((entry) => (
                    <Entry
                        id={entry.id}
                        title={entry.title}
                        description={entry.description}
                    />
                ))}
                My HARD-CODED list:
                <Entry id={nanoid()} title={"The Title"} description={"The description"}/>
                <Entry id={nanoid()} title={"The 2nd Title"} description={"The 2rd description"}/>
                <Entry id={nanoid()} title={"The 3rd Title"} description={"The 3rd description"}/>
              </div>
              
          </div>
          
          
        );
    }
}

export default JournalTab;
