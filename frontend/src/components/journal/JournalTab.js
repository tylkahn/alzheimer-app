import React from "react";
import Entry from './Entry'
import {nanoid} from 'nanoid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
library.add(faFloppyDisk);
library.add(faMagnifyingGlass);
library.add(faSquarePlus);

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* what an ENTRY looks like{
                id: nanoid(),
                title: "The First Title",
                description: "The First Description",
                images: [],
                lastUpdated: "3/27/2022",
                tagList: [],
            }*/
            entryList: this.props.entries,
            entryTitle: `Entry Title ${this.props.entries.length+1}`,
            entryDescription: '',
            searchText: '',
            display: 'entryList' //either entrylist or editEntry
        };
    }

    //this one is specific to journalentries
    addImage = (jpg) => {
        this.setState({
            images: [...jpg],
        });
    }

    onSave = () => {
        if (this.state.entryDescription.trim().length > 0){
            this.state.entryList.push({
                id: nanoid(4), 
                title: this.state.entryTitle,
                description: this.state.entryDescription,
                images: ["./images/journal.jpg"],//default every image to have the journal image
            });
            
            
        }
        this.setState({
            display: 'entryList',
            entryTitle: '',
            entryDescription: '',
        });
        
        console.log("Changing entry Description: " + this.state.entryDescription);
        this.forceUpdate();

    }

    deleteEntry = (id) => {
        const newEntries = this.state.entryList.filter((e) => e.id !== id);
        this.state.entryList = newEntries;
        this.forceUpdate();

    }

    editEntry = (id) => {
        const entries = this.state.entryList;
        entries.map(entry=>{      
            if(entry.id === id){
                /*this.setState({
                    title: entry.title,
                    description: entry.description,
                    display: 'editEntry',
                });*/
                this.state.title = entry.title;
                this.state.description = entry.description;
                this.state.display = 'editEntry';
                //this.state.entryList.remove(entry);
                //delete this.state.entryList[entry];
            }
            
        })
        console.log("Title, Description, Display: "+ this.state.title + " " + this.state.description + " " + this.state.display);
        this.forceUpdate();
    }

    Search = (event) => {
        this.setState({
            searchText: event.target.value,
        });
    }

    handleDescriptionChange = (event) => {
        this.setState({
            entryDescription: event.target.value,
        });
        this.forceUpdate();
        //console.log(this.state.entryDescription);
    }

    handleTitleChange = (event) => {
        //////in the title: putting a bunch of spaces, typing a character, and deleting the character, 
            //will add an entry that is titled that deleted character
        if (event.target.value.trim().length > 0){
            this.setState({
                entryTitle: event.target.value,
            
            });
        }
    }

    //on componentDidMount(), grab everything in localStorage/postgress and set the state

    componentDidMount = () => {
        const savedEntries = JSON.parse(localStorage.getItem('react-journal-data'));
        //if there exist items in the localStorage, save it as our state
        if (savedEntries){ this.state.entryList = savedEntries; }
        /*if (savedEntries){ this.setState(savedEntries); //empties the localstorage on each change }*/
        console.log(savedEntries);

        this.forceUpdate();
    }

    componentDidUpdate(){ //equiv to useEffect
        localStorage.setItem('react-journal-data', JSON.stringify(this.state.entryList));
    }

    editDisplay = () => {
        this.setState({
            display: 'editEntry',
        });
        this.forceUpdate();
        

    }

    render = () => {
        return (
            //react components will have a list of all these kinds of useful functions (like maybe onComponentDidUpdate)
          
          //probably need one package to save the image as some datatype
          //look up react library where I can input an image and save it
            //can probably just look up "Add File" (figure out how to limit it to jpg)
          //<MdSearch className='search-icons' size='1.25em'/>: react icon for searching
          
            <div className="journal">   
                <div className='row'>
                    <div className='column'>
                        <div className='search'>
                            <FontAwesomeIcon icon="magnifying-glass" />
                            <input onChange={this.Search} type="text" placeholder='type to search...'/>
                        </div>                        
                        
                        <button 
                            onClick={() => {this.editDisplay()}}
                            className='save' >
                            <FontAwesomeIcon icon="square-plus" />
                        </button>
                    </div>

                    <div className='column'>
                        {this.state.display == "entryList" && (
                            <div className="entry-list"> 
                                {this.state.entryList.filter((e) => (e.title).toLowerCase().includes(this.state.searchText)).map(entry => (
                                    <Entry
                                        id={entry.id}
                                        title={entry.title}
                                        description={entry.description}
                                        images={entry.images}
                                        key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                                        handleDeleteEntry = {this.deleteEntry}
                                        handleEditEntry = {this.editEntry}
                                    />
                                    ),
                                )}
                            </div>
                        )}

                        {this.state.display == "editEntry" && (
                            <div className="entry new">
                                <textarea className= "entry-title"
                                    rows='1'
                                    cols = '10'
                                    placeholder='Enter title...'
                                    onChange={this.handleTitleChange}
                                >  
                                    {this.state.title}
                                </textarea>
                                <textarea className= "entry-description"
                                    rows='4'
                                    cols = '10'
                                    placeholder='Type to create the Journal Entry...'
                                    //value={entryDescription} for resetting state but i dont think i need this bc of the last line of handlesaveclick
                                    onChange={this.handleDescriptionChange}
                                >
                                    {this.state.description}
                                </textarea>
                                <div className="entry-footer">
                                    <button 
                                        onClick={() => {this.onSave()}} 
                                        className='save' >
                                        <FontAwesomeIcon icon="floppy-disk" />
                                    </button>
                                </div>
                            </div>
                            
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default JournalTab;
