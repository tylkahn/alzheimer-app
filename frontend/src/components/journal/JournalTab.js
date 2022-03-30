import React from "react";
import Entry from './Entry'
import {nanoid} from 'nanoid';

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* what an entry looks like
            {
                id: nanoid(),
                title: "The First Title",
                description: "The First Description",
                images: [],
                lastUpdated: "3/27/2022",
                tagList: [],
            }
            */
            entryList: this.props.entries,
            entryText: '',
        };
        this.createJournalEntry.bind(this);
        //console.log(this.state.entryList[1]);
    }
    
    //obtains new entry information and calls save function
    createJournalEntry(){//addNote.js
        const handleChange = (event) => {
            //event.target.value is what was typed into the text area
            this.setState({
                entryText: event.target.value
            });
            //console.log(this.state.entryText);
            
        }

        const handleSaveClick = () => {
            this.setState({
                entryList: [...{id: 7, title: "the 7th title", description: "the 7th description"}],
                entryText: '',
            })
        }
        return (
            <div className="entry new">
                <textarea 
                    rows='8'
                    cols = '10'
                    placeholder='Type to create the Journal Entry...'
                    //value={entryText} for resetting state but i dont think i need this bc of the last line of handlesaveclick
                    onChange={handleChange}
                ></textarea>
                <div className="entry-footer">
                    <small>Characters remaining: 100</small>
                    <button className='save' >Save</button>
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

        //render every entry from entrylist
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
                        key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                    />
                ))}
                My HARD-CODED list:
                <Entry id={nanoid(4)} title={"The Title"} description={"The description"}/>
                <Entry id={nanoid(4)} title={"The 2nd Title"} description={"The 2rd description"}/>
                <Entry id={nanoid(4)} title={"The 3rd Title"} description={"The 3rd description"}/>
              </div>
              
          </div>
          
          
        );
    }
}

export default JournalTab;
