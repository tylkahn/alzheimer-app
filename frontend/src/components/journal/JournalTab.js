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
            displayList: [],
            entryTitle: '',
            entryDescription: '',
        };
    }

    //this.load(props.id)->which calls create

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

    addEntry = () => {
        this.state.entryList.push({
            id: nanoid(4), 
            //eventually have the title default to this if the string is empty, but have another title text box where the user can inputs stuff
            title: `Entry ${this.state.entryList.length+1}`,
            description: this.state.entryDescription,
        });
        this.forceUpdate();
    }

    handleChange = (event) => {
        //event.target.value is what was typed into the text area
        this.setState({
            entryDescription: event.target.value
        });
        console.log(this.state.entryDescription);
    }

    render() {
        //kinda the noteslist.js

        return (
            //when some button is pressed, call makeDisplayList() that 
            //uses the javascript filter function on entry list to produce display list based on title inputted from text box
            //onComponentDidMount might be used to initialize displayList to entryList if the page is loaded
                //react components will have a list of all these kinds of useful functions (like maybe onComponentDidUpdate)
          
          //probably need one package to save the image as some datatype
          //look up react library where I can input an image and save it
            //can probably just look up "Add File" (figure out how to limit it to jpg)
          
          
          <div className="journal">    

            <div className="entry new">
                <textarea 
                    rows='8'
                    cols = '10'
                    placeholder='Type to create the Journal Entry...'
                    //value={entryDescription} for resetting state but i dont think i need this bc of the last line of handlesaveclick
                    onChange={this.handleChange}
                ></textarea>
                <div className="entry-footer">
                    <small>Characters remaining: 100</small>
                    <button onClick={() => {this.addEntry()}} className='save' >Save</button>
                </div>
            </div>

              <div className="entry-list">
                My NON-hard-coded list: 
                {this.state.entryList.map((entry) => (

                    <Entry
                        id={entry.id}
                        title={entry.title}
                        description={entry.description}
                        key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                    />
                ))}
              </div>
              
          </div>
        );
    }
}

export default JournalTab;
