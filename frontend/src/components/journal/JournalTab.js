import React from "react";
import Entry from './Entry'
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

library.add(faFloppyDisk);

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* what an ENTRY looks like
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
            entryTitle: '',
            entryDescription: '',
            searchText: '',
        };
    }

    //this one is specific to journalentries
    addImage = (jpg) => {
        this.setState({
            images: [...jpg],
        });
    }

    addEntry = () => {
        if (this.state.entryDescription.trim().length > 0){
            this.state.entryList.push({
                id: nanoid(4), 
                //eventually have the title default to this if the string is empty, but have another title text box where the user can inputs stuff
                title: this.state.entryTitle,
                
                description: this.state.entryDescription,
                images: ["./images/journal.jpg"],//default every image to have the journal image
            });
            
            this.setState({///////////////////reset contents of entryDescription, doesnt work, might need value variable in entry new tag below
                entryDescription: ''
            });
            this.forceUpdate();
        }

    }

    Search = (event) => {
        this.setState({
            searchText: event.target.value,
            //displayList: this.state.entryList.filter(
            //    (entry)=>entry.state.title.toLowerCase().includes(searchText)
            //),
        });
        console.log(this.state.searchText);
    }

    handleDescriptionChange = (event) => {
        //event.target.value is what was typed into the text area
        this.setState({
            entryDescription: event.target.value,
        });
        console.log(this.state.entryDescription);
    }

    handleTitleChange = (event) => {
        //event.target.value is what was typed into the text area
        this.setState({
            entryTitle: event.target.value,
        });
        console.log(this.state.entryTitle);
    }

    render = () => {
        //kinda the noteslist.js

        return (
            //when some button is pressed, call makeDisplayList() that 
            //uses the javascript filter function on entry list to produce display list based on title inputted from text box
            //onComponentDidMount might be used to initialize displayList to entryList if the page is loaded
                //react components will have a list of all these kinds of useful functions (like maybe onComponentDidUpdate)
          
          //probably need one package to save the image as some datatype
          //look up react library where I can input an image and save it
            //can probably just look up "Add File" (figure out how to limit it to jpg)
          //<MdSearch className='search-icons' size='1.25em'/>: react icon for searching, might have to do an annoying installation to have access to the react-icons 
          
          <div className="journal">    

            <div className='search'>
                <input onChange={this.Search} type="text" placeholder='type to search...'/>
            </div>

            <div className="entry new">
                <textarea className= "entry-title"
                    rows='1'
                    cols = '10'
                    placeholder='Enter title...'
                    onChange={this.handleTitleChange}
                ></textarea>
                <textarea className= "entry-description"
                    rows='8'
                    cols = '10'
                    placeholder='Type to create the Journal Entry...'
                    //value={entryDescription} for resetting state but i dont think i need this bc of the last line of handlesaveclick
                    onChange={this.handleDescriptionChange}
                ></textarea>
                <div className="entry-footer">
                    <button onClick={() => {this.addEntry()}} className='save' ><FontAwesomeIcon icon="floppy-disk" /></button>
                </div>
            </div>

            <div className="entry-list"> 
            
            {this.state.entryList.filter((e) => (e.title).toLowerCase().includes(this.state.searchText)).map(entry => (
                <Entry
                    id={entry.id}
                    title={entry.title}
                    description={entry.description}
                    images={entry.images}
                    key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                />
                ),
                
            )}
            </div>           
              
          </div>
        );
    }
}

export default JournalTab;
