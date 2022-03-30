import React from "react";
import {useState} from 'react';
import Entry from './Entry'

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* what an entry looks like
            id: nanoid(),
            title: "The First Title",
            description: "The First Description",
            images: [],
            lastUpdated: "3/27/2022",
            tagList: [],
            },
            */
            entryList: this.props.entries,
            //entrylist: [],
        };
        console.log(this.id);
    }
    
    //obtains new entry information and calls save function
    createJournalEntry(){
        return (
            <div className="journalentry new ">
                <textarea 
                    rows='8'
                    cols = '10'
                    placeholder='Type to create the Journal Entry...'
                ></textarea>
                <div className="journalentry-footer">
                    <small>Characters remaining: 100</small>
                    <button className='save'>Save</button>
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
        return (
          <div className="journal">
              <this.createJournalEntry/>
              <div className="entry-list">
                My hard-coded list: 
                <Entry id={"0"} title={"The Title"} description={"The description"}/>
                <Entry id={"1"} title={"The 2nd Title"} description={"The 2rd description"}/>
                <Entry id={"2"} title={"The 3rd Title"} description={"The 3rd description"}/>
              </div>
              
          </div>
          
          
        );
        /*The rest: 
                {entryList.map(() => (


                ))}*/
    }
}

export default JournalTab;
